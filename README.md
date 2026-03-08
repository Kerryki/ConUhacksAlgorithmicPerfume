👃 [Project Name]: The AI Alchemist
A Computational Perfumery Engine using Vector Search and Gemini 2.0.

🌟 The Vision

Most people are forced to buy perfumes "off the shelf," choosing from scents designed for the masses. We believe you should be able to smell exactly how you feel in the moment. [Project Name] is a "Digital Nose" that translates a user’s aesthetic "vibe"—colors, moods, and seasons—into a chemically valid, bespoke perfume formula.

🛠 Technical Architecture (My Role)

I served as the Lead Backend Architect for this project. To ensure high-speed integration during the 48-hour hackathon, I developed the core logic modules locally which were integrated via a central pusher.

1. The Matchmaker (Vector Search Engine)

Rather than using simple keyword filtering, I built a Hybrid Matching Engine.

Vectorization: I mapped our scent database into a 4-dimensional vector space: Floral, Oriental, Fresh, and Woody.

Spatial Math: I implemented Cosine Similarity (using NumPy and scikit-learn) to calculate the mathematical "angle" between a user's desired vibe and our inventory. This allows for "fuzzy matching" that a standard SQL query couldn't achieve.

2. The Alchemist (GenAI Integration)

LLM Pipeline: I engineered the prompt logic for Gemini 2.0 Flash to act as a Master Perfumer.

Safety & Guardrails: To prevent "hallucinations," I built a Python validation layer. The AI is restricted to only using ingredient IDs present in our CSV inventory, and I implemented a normalization algorithm to ensure all "drop counts" in the recipe sum to exactly 100.

🧪 Features

Vibe-to-Scent Translation: Converts Hex colors and mood sliders into chemical formulas.

Algorithmic Accuracy: Recipes are grounded in real-world performance data (Longevity & Sillage).

Persona-Driven Storytelling: Generates poetic, archetype-based descriptions (e.g., "The Adventurer," "The Mystic").

Live Provenance: Successfully generated custom formulas for 20+ users during the live hackathon demo.

🚀 Tech Stack

Language: Python 3.x

Framework: Flask (REST API)

AI: Gemini 2.0 Flash (via OpenRouter)

Data/Math: Pandas, NumPy, Scikit-learn

Frontend: React (Vite)
