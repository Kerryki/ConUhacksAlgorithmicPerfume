from routes import perfumes_bp
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
from google import genai
import pandas as pd
from pydantic import BaseModel, Field
from typing import Dict, List
import ast
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Load environment variables
load_dotenv()
api_key = os.environ.get('GEMINI_API_KEY')
client = genai.Client(api_key=api_key)
model = 'gemini-3-flash-preview'

# Import routes
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Configuration
app.config['DEBUG'] =  os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
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

# --- DATA MODELS ---
class Recipe(BaseModel):
    recipe_name: str = Field(description="A creative, alchemical name")
    description: str = Field(description="A poetic and thematic description")
    percentages: Dict[str, int] = Field(description="Final ingredient breakdown")
    pyramid: Dict[str, List[str]] = Field(description="Ingredients in 'top', 'middle', and 'base' layers")
    # drops: Dict[str, int] = Field(description="ID codes and exact drop counts (Sum must be 100)")
    projected_performance: Dict[str, float] = Field(description="Predicted longevity and sillage scores")

# --- KNOWLEDGE BASE ---
NOTE_MAPPING = {
    'Floral': ['floral', 'rose', 'white floral', 'powdery', 'lavender', 'violet', 'jasmine', 'tuberose', 'iris'],
    'Oriental': ['vanilla', 'amber', 'sweet', 'warm spicy', 'coffee', 'cacao', 'honey', 'balsamic', 'animalic'],
    'Fresh': ['citrus', 'fresh', 'aquatic', 'fruity', 'green', 'marine', 'ozonic', 'aromatic'],
    'Woody': ['woody', 'oud', 'leather', 'musky', 'earthy', 'tobacco', 'patchouli', 'cedar', 'mossy']
}

def safe_eval(val):
    try:
        if pd.isna(val) or val == "": return {}
        return ast.literal_eval(val)
    except:
        return {}
        
def get_scent_vector(accords_data):
    """Converts accords into a 4D normalized vector."""
    accords = safe_eval(accords_data) if isinstance(accords_data, str) else accords_data
    categories = ['Floral', 'Oriental', 'Fresh', 'Woody']
    vector = np.zeros(len(categories))
    if not accords: return vector
    for accord, pct in accords.items():
        accord_lower = accord.lower().strip()
        for i, cat in enumerate(categories):
            if any(m_note in accord_lower for m_note in NOTE_MAPPING[cat]):
                vector[i] += float(pct)
                break
    total = np.sum(vector)
    return vector / total if total > 0 else vector

# Pre-load perfume database
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, '..', 'data', 'data_v3.csv')
df = pd.read_csv(DATA_PATH)
db_vectors = np.array([get_scent_vector(row['main_accords_pct']) for _, row in df.iterrows()])


def get_best_candidates(user_prefs, df, db_vectors):
    """Calculates a composite score for all perfumes and returns top 5."""
    # 1. Calculate Vibe Similarity (Cosine)
    categories = ['Floral', 'Oriental', 'Fresh', 'Woody']
    u_vec = np.zeros(len(categories))
    for cat, val in user_prefs['scent_identity'].items():
        if cat.title() in categories:
            u_vec[categories.index(cat.title())] = float(val)
    if np.sum(u_vec) > 0: u_vec /= np.sum(u_vec)
    
    vibe_scores = cosine_similarity(u_vec.reshape(1, -1), db_vectors)[0]
    
    # 2. Calculate Numerical Match (Proximity)
    # We compare Gender, Season, Day, Longevity, and Sillage
    def calculate_diff(row):
        diffs = [
            abs(row['gender_score'] - user_prefs['gender']),
            abs(row['season_score'] - user_prefs['season']),
            abs(row['day_night_score'] - user_prefs['day']),
            abs(row['longevity_score'] - user_prefs['longevity']),
            abs(row['sillage_score'] - user_prefs['sillage'])
        ]
        # Normalize diffs: 0 is perfect, higher is worse. Average them and invert.
        return 1 - (np.mean(diffs) / 100)

    perf_scores = df.apply(calculate_diff, axis=1)
    
    # 3. Combined Score (Weighted: 50% smell, 50% performance/context)
    temp_df = df.copy()
    temp_df['match_score'] = (vibe_scores * 0.5) + (perf_scores * 0.5)
    
    return temp_df.sort_values(by='match_score', ascending=False).head(5)


@app.route('/create-scent', methods=['POST'])
def create_scent():
    data = request.json

    season_map = {1: 0, 2: 33, 3: 66, 4: 100}
    
    # 1. Capture User Intent
    user_prefs = {
        'scent_identity': data.get('scent_identity', {'floral': 100}), # defaults to floral
        'gender': data.get('gender_val', 50),
        'season': season_map.get(data.get('season_val', 1), 50),
        'day': data.get('time_of_day', 50),
        'longevity': data.get('longevity', 50),
        'sillage': data.get('sillage', 50)
    }

    try:
        # 2. CALCULATE VIBE SIMILARITY
        top_matches = get_best_candidates(user_prefs, df, db_vectors)

        oils_context = "\n".join([
            f"ID: {row['code']} | Match Quality: {round(row['match_score']*100)}% | "
            f"Longevity: {row['longevity_score']} | Sillage: {row['sillage_score']} | "
            f"Day/Night: {row['day_night_score']} | Season: {row['season_score']} | "
            f"Accords: {row['main_accords_pct']} | Notes: {row['top_notes_pct']}, {row['middle_notes_pct']}, {row['base_notes_pct']}"
            for _, row in top_matches.iterrows()
        ])

        prompt = f"""
        You are a Master Alchemist. Formulate a perfume based on these Laboratory Oils:
        
        LABORATORY INVENTORY:
        {oils_context}

        USER REQUIREMENTS:
        - Vibe: {user_prefs['scent_identity']}
        - Performance: {user_prefs['longevity']} Longevity, {user_prefs['sillage']} Sillage
        - Context: Season Score {user_prefs['season']}, Time Score {user_prefs['day']}

        INSTRUCTIONS:
        1. Select 3-5 IDs. Use only these to create the 'drops' list (Sum = 100).
        2. Assign ingredients to 'pyramid' (top, middle, base) based on their volatility.
        3. In 'projected_performance', calculate the weighted average of the chosen IDs' scores.
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
        return jsonify(recipe_data.model_dump())

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=app.config['PORT'],
        debug=app.config['DEBUG']
    )
