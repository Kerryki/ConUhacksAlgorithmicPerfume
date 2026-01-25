from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
from google import genai
import pandas as pd
from pydantic import BaseModel, Field
from typing import Dict

# Load environment variables
load_dotenv()
api_key = os.environ.get('GEMINI_API_KEY')
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable is not set")
client = genai.Client(api_key=api_key)
model = 'gemini-3-flash-preview'

# Import routes
from routes import perfumes_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Configuration
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
app.config['PORT'] = int(os.getenv('FLASK_PORT', 5000))

# Register blueprints
app.register_blueprint(perfumes_bp)

@app.route('/')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Flask backend is running'
    }), 200

@app.route('/api/health', methods=['GET'])
def api_health():
    """API health check endpoint"""
    return jsonify({
        'status': 'ok',
        'service': 'Algorithmic Perfumes API'
    }), 200

def load_dataset():
    try:
        df = pd.read_csv('../data/data_v3.csv')
        summary_list = []
        for _, row in df.iterrows():
            summary_list.append(
                f"ID: {row['code']} | Season: {row['season_score']} | "
                f"Accords: {row['main_accords_pct']} | Recipe: {row['top_notes_pct']}, {row['middle_notes_pct']}, {row['base_notes_pct']} | "
                f"Gender: {row['gender_score']} | Season Score: {row['season_score']} | "
                f"Longevity: {row['longevity_score']} | Sillage: {row['sillage_score']}"
            )
        # print('\n'.join(summary_list[:5]))
        return "\n".join(summary_list)
    except Exception as e:
        print(f"Error loading CSV: {e}")
        return ""

DATASET_CONTEXT = load_dataset()

class Recipe(BaseModel):
    recipe_name: str = Field(
        description="A creative, alchemical name for the perfume")
    description: str = Field(
        description="A poetic and thematic description of the scent")
    percentages: Dict[str, int] = Field(
        description="Map of ingredient names to their percentage (integer)")
    drops: Dict[str, int] = Field(
        description="A map of the perfume 'code' from the dataset to the number of drops to use. Max 5-6 different codes.")

def find_best_oils(user_longevity, user_sillage, user_gender, target_season_score, df):
    matches = df[
        (df['longevity_score'].between(user_longevity-20, user_longevity+20)) &
        (df['sillage_score'].between(user_sillage-20, user_sillage+20)) &
        (df['gender_score'].between(user_gender-20, user_gender+20)) &
        (df['season_score'].between(target_season_score-20, target_season_score+20))
    ]
    return matches.head(3)

@app.route('/create-scent', methods=['POST'])
def create_scent():
    data = request.json

    age = data.get('age', 18)
    color_rgb = data.get('color', [255, 255, 255])
    gender_slider = data.get('gender_val', 50)
    time_of_day = data.get('time_of_day', 50)
    scent_identity = data.get('scent_identity', '')
    season_input = data.get('season_val', 1)
    season_map = {1: 0, 2: 33.3, 3: 66.7, 4: 100}
    target_season_score = season_map.get(season_input, 50)
    longevity_pref = data.get('longevity', 50)
    sillage_pref = data.get('sillage', 50)

    find_best_oils(longevity_pref, sillage_pref, gender_slider, target_season_score, pd.read_csv('../data/data_v3.csv'))
    prompt = f"""
    You are a Master Alchemist specializing in Mathematical Perfumery.
    Your goal is to formulate a specific blend using the REFERENCE DATASET below.

    REFERENCE DATASET (Oils in your Laboratory):
    {DATASET_CONTEXT}

    USER PROFILE:
    - Scent Identity/Hobbies: {scent_identity}
    - Age: {age} | Color context: {color_rgb}
    - TARGET SCORES:
        * Gender Position: {gender_slider} (0=Fem, 100=Masc)
        * Time of Day: {time_of_day} (0=Day, 100=Night)
        * Season: {target_season_score} (1=Winter, 2=Spring, 3=Summer, 4=Fall)
        * Requested Performance: {longevity_pref} Longevity & {sillage_pref} Sillage

    INSTRUCTIONS:
    1. DATABASE SEARCH: Look through the IDs in the dataset. Select 3-5 'IDs' (oils) whose 'Gender Score' and 'Season Score' best align with the User's Target Scores.
    2. SYNTHESIS: Use the 'Recipe' (note percentages) from those chosen IDs to determine the scent profile.
    3. DROPS: Allocate exactly 100 drops total across your chosen IDs.
       - If the user wants higher longevity, use more drops of an ID that has a high 'base_notes_pct'.
    4. JUSTIFICATION: In the description, explain the alchemy. (e.g., "Blended ID h4 for its high Masculinity score and earthy base to match your forest vibe.")

    CONSTRAINTS:
    - Use ONLY IDs provided in the Reference Dataset.
    - Total 'drops' must sum to exactly 100.
    - The 'percentages' field should represent the estimated FINAL scent notes of the mixture.
    """

    try:
        response = client.models.generate_content(
            model=model,
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "response_json_schema": Recipe.model_json_schema(),
            },
        )
        recipe_data = Recipe.model_validate_json(response.text)
        # Extract the JSON part of the response
        return jsonify(recipe_data.model_dump())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=app.config['PORT'],
        debug=app.config['DEBUG']
    )
