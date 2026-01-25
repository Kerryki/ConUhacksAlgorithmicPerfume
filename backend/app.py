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
gemini_api_key = os.environ.get('GEMINI_API_KEY')
# open_router_api_key = os.environ.get('OPEN_ROUTER_API_KEY')
client = genai.Client(api_key=gemini_api_key)
model = 'gemini-2.5-flash-lite'

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

# --- DATA MODELS ---


class Recipe(BaseModel):
    recipe_name: str = Field(description="A creative, alchemical name")
    description: str = Field(description="A poetic and mysterious description")
    percentages: Dict[str, int] = Field(
        description="Final ingredient breakdown")
    # pyramid: Dict[str, List[str]] = Field(
    #     description="Ingredients in 'top', 'middle', and 'base' layers")
    drops: Dict[str, int] = Field(
        description="ID codes and exact drop counts (Sum must be 100)")
    projected_performance: Dict[str, float] = Field(
        description="Predicted longevity and sillage scores")
    note_distribution: Dict[str, float] = Field(
        description="Total percentage of Top, Mid, and Base notes in the blend")


# --- KNOWLEDGE BASE ---
NOTE_MAPPING = {
    'Floral': ['floral', 'rose', 'white floral', 'powdery', 'lavender', 'violet', 'jasmine', 'tuberose', 'iris'],
    'Oriental': ['vanilla', 'amber', 'sweet', 'warm spicy', 'coffee', 'cacao', 'honey', 'balsamic', 'animalic'],
    'Fresh': ['citrus', 'fresh', 'aquatic', 'fruity', 'green', 'marine', 'ozonic', 'aromatic'],
    'Woody': ['woody', 'oud', 'leather', 'musky', 'earthy', 'tobacco', 'patchouli', 'cedar', 'mossy']
}


def safe_eval(val):
    try:
        if pd.isna(val) or val == "":
            return {}
        return ast.literal_eval(val)
    except:
        return {}


def get_scent_vector(accords_data):
    """Converts accords into a 4D normalized vector."""
    accords = safe_eval(accords_data) if isinstance(
        accords_data, str) else accords_data
    categories = ['Floral', 'Oriental', 'Fresh', 'Woody']
    vector = np.zeros(len(categories))
    if not accords:
        return vector
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
# Support both local development and Railway deployment paths
# First check for data file in backend folder (Railway), then fall back to data folder (local dev)
DATA_PATH_RAILWAY = os.path.join(BASE_DIR, 'data_v3.csv')
DATA_PATH_LOCAL = os.path.join(BASE_DIR, '..', 'data', 'data_v3.csv')
DATA_PATH = os.getenv('DATA_PATH', DATA_PATH_RAILWAY if os.path.exists(DATA_PATH_RAILWAY) else DATA_PATH_LOCAL)
df = pd.read_csv(DATA_PATH)
db_vectors = np.array([get_scent_vector(row['main_accords_pct'])
                      for _, row in df.iterrows()])


def get_best_candidates(user_prefs, df, db_vectors):
    """Calculates a composite score for all perfumes and returns top 5."""
    # 1. Calculate Vibe Similarity (Cosine)
    categories = ['Floral', 'Oriental', 'Fresh', 'Woody']
    u_vec = np.zeros(len(categories))
    for cat, val in user_prefs['scent_identity'].items():
        if cat.title() in categories:
            u_vec[categories.index(cat.title())] = float(val)
    if np.sum(u_vec) > 0:
        u_vec /= np.sum(u_vec)
    else:
        # Fallback: a balanced vector so the math doesn't break
        u_vec = np.array([0.25, 0.25, 0.25, 0.25])

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

    # season_map = {1: 0, 2: 33, 3: 66, 4: 100}

    # # 1. Capture User Intent
    # user_prefs = {
    #     'scent_identity': data.get('scent_identity', {'floral': 100}), # defaults to floral
    #     'gender': data.get('gender_val', 50),
    #     'season': season_map.get(data.get('season_val', 1), 50),
    #     'day': data.get('time_of_day', 50),
    #     'longevity': data.get('longevity', 50),
    #     'sillage': data.get('sillage', 50)
    # }

    try:
        # Scent Identity (Already a dict)
        scent_identity = data.get('scent_identity', {'floral': 100})

        # Longevity & Sillage (Convert 0.0-1.0 to 0-100)
        longevity_data = data.get('longevity_data', {})
        longevity_pref = longevity_data.get('longevity_score', 0.5) * 100
        sillage_pref = longevity_data.get('projection_score', 0.5) * 100

        # Gender (Convert 0.52 to 52)
        gender_val = data.get('gender_data', {}).get(
            'gender_expression', 0.5) * 100

        # Time and Season
        time_of_day = data.get('time_data', {}).get('time_value', 50)
        season_input = data.get('weather_data', {}).get(
            'season', {}).get('value', 1)

        # Metadata for the AI Persona
        user_name = data.get('personal_name_data', {}).get(
            'personal_name', 'Traveler')
        personality = data.get('personality_data', {}).get(
            'personality', {}).get('name', 'Adventurer')

        season_map = {1: 0, 2: 33, 3: 66, 4: 100}
        target_season_score = season_map.get(season_input, 50)

        user_prefs = {
            'scent_identity': scent_identity,
            'gender': gender_val,
            'season': target_season_score,
            'day': time_of_day,
            'longevity': longevity_pref,
            'sillage': sillage_pref
        }
        # 2. CALCULATE VIBE SIMILARITY
        top_matches = get_best_candidates(user_prefs, df, db_vectors)

        oils_context = "\n".join([
            f"ID: {row['code']} | Match Quality: {round(row['match_score']*100)}% | "
            f"Longevity: {row['longevity_score']} | Sillage: {row['sillage_score']} | "
            f"Day/Night: {row['day_night_score']} | Season: {row['season_score']} | "
            f"Accords: {row['main_accords_pct']}"
            for _, row in top_matches.iterrows()
        ])

        age_range = data.get('age_data', {}).get('ageGroup', {}).get('label', 'Adult')
        intensity = data.get('age_data', {}).get('ageGroup', {}).get('intensityLevel', 'Moderate')

        prompt = f"""
        System: You are a Master Alchemist. A seeker named {user_name} with the spirit of an {personality} requests a formula.
        They are a {age_range} seeking a {intensity} fragrance.
        
        LABORATORY INVENTORY (Best Matches):
        {oils_context}

        USER PROFILE:
        - Vibe: {scent_identity}
        - Performance: {longevity_pref} Longevity, {sillage_pref} Sillage
        - Context: Season Score {target_season_score}, Time Score {time_of_day}

        TASK:
        1. Select 3-5 IDs. Create a recipe where 'drops' sum to 100.
        2. Assign notes to 'pyramid' (top, middle, base).
        3. Write a poetic description tailored to an '{personality}' archetype.
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

        available_ids = top_matches['code'].tolist()
        # Run the Guardrail
        recipe_data = validate_and_fix_recipe(recipe_data, available_ids, df)

        # 2. CALCULATE NOTE DISTRIBUTION
        # We look up each ID in our drops and calculate the aggregate pyramid
        total_top = 0.0
        total_mid = 0.0
        total_base = 0.0
        total_drops = sum(recipe_data.drops.values())

        for code, drops in recipe_data.drops.items():
            # Find the row for this perfume oil
            matching_rows = df[df['code'] == code]
            if matching_rows.empty:
                # Skip IDs that don't exist in your database (avoid hallucinations)
                continue
            oil_row = matching_rows.iloc[0]

            # Sum the percentages in each layer for this specific oil
            # (e.g., if top_notes_pct is {'Lemon': 10, 'Lime': 5}, layer_weight is 15)
            top_weight = sum(safe_eval(oil_row['top_notes_pct']).values())
            mid_weight = sum(safe_eval(oil_row['middle_notes_pct']).values())
            base_weight = sum(safe_eval(oil_row['base_notes_pct']).values())

            # Weighted addition to the total blend
            total_top += (top_weight * drops)
            total_mid += (mid_weight * drops)
            total_base += (base_weight * drops)

        # Normalize by total drops to get percentages (0-100)
        recipe_data.note_distribution = {
            "top": round(total_top / total_drops, 2) if total_drops > 0 else 0,
            "middle": round(total_mid / total_drops, 2) if total_drops > 0 else 0,
            "base": round(total_base / total_drops, 2) if total_drops > 0 else 0
        }

        return jsonify(recipe_data.model_dump())

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def validate_and_fix_recipe(recipe_data, available_ids, df):
    # 1. Clean IDs (Remove anything the AI hallucinated)
    clean_drops = {k: v for k, v in recipe_data.drops.items()
                   if k in available_ids}

    # 2. Fix the Math (Normalize to 100 drops)
    current_total = sum(clean_drops.values())
    if current_total != 100 and current_total > 0:
        # Scale every drop count so they sum to exactly 100
        factor = 100 / current_total
        clean_drops = {k: int(round(v * factor))
                       for k, v in clean_drops.items()}

        # Adjust for rounding errors (ensure sum is exactly 100)
        diff = 100 - sum(clean_drops.values())
        if diff != 0:
            first_key = list(clean_drops.keys())[0]
            clean_drops[first_key] += diff

    recipe_data.drops = clean_drops
    return recipe_data


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=app.config['PORT'],
        debug=app.config['DEBUG']
    )
