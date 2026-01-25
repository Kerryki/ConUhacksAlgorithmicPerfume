from routes import perfumes_bp
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


class Recipe(BaseModel):
    recipe_name: str = Field(
        description="A creative, alchemical name for the perfume")
    description: str = Field(
        description="A poetic and thematic description of the scent")
    percentages: Dict[str, int] = Field(
        description="Map of ingredient names to their percentage (integer)")
    drops: Dict[str, int] = Field(
        description="A map of the perfume 'code' from the dataset to the number of drops to use. Max 5-6 different codes.")


def find_best_oils(target_longevity, target_sillage, target_gender, target_season, df):
    mask = (
        (df['longevity_score'].between(target_longevity - 25, target_longevity + 25)) &
        (df['sillage_score'].between(target_sillage - 25, target_sillage + 25)) &
        (df['gender_score'].between(target_gender - 25, target_gender + 25)) &
        (df['season_score'].between(target_season - 25, target_season + 25))
    )

    matches = df[mask]

    # If no perfect matches, fall back to the 5 closest by gender/season
    if matches.empty:
        return df.iloc[(df['gender_score'] - target_gender).abs().argsort()[:5]]

    return matches.head(5)


@app.route('/create-scent', methods=['POST'])
def create_scent():
    data = request.json

    # age = data.get('age', 18)
    # color_rgb = data.get('color', [255, 255, 255])
    gender_val = data.get('gender_val', 50)
    time_of_day = data.get('time_of_day', 50)
    scent_identity = data.get('scent_identity', '')

    season_input = data.get('season_val', 1)
    season_map = {1: 0, 2: 33.3, 3: 66.7, 4: 100}
    target_season = season_map.get(season_input, 50)

    longevity_pref = data.get('longevity', 50)
    sillage_pref = data.get('sillage', 50)

    try:
        top_oils_df = find_best_oils(
            longevity_pref, sillage_pref, gender_val, target_season, pd.read_csv('../data/data_v3.csv'))

        oils_context = ""
        for _, row in top_oils_df.iterrows():
            oils_context += (
                f"ID: {row['code']} | Season: {row['season_score']} | "
                f"Accords: {row['main_accords_pct']} | Recipe: {row['top_notes_pct']}, {row['middle_notes_pct']}, {row['base_notes_pct']} | "
                f"Gender: {row['gender_score']} | Season Score: {row['season_score']} | Day/Night: {row['day_night_score']} | "
                f"Longevity: {row['longevity_score']} | Sillage: {row['sillage_score']}"
            )

            prompt = f"""
        You are a Master Alchemist. Use ONLY the following Recommended Oils to create a blend.

        RECOMMENDED OILS:
        {oils_context}

        USER REQUEST:
        Vibe: {scent_identity} |
        Target Gender: {gender_val} (0=Fem, 100=Masc) |
        Season: {target_season} (0=Winter, 1=Spring, 2=Summer, 3=Fall) |
        Time of Day: {time_of_day} (0=Day, 100=Night) |
        Desired Longevity: {longevity_pref} |
        Desired Sillage: {sillage_pref} |


        TASK:
        1. Select 3-5 IDs from the recommended list above.
        2. Assign drops totaling exactly 100.
        3. Name the creation and explain why these specific IDs were blended to match the user's vibe.
        """
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
