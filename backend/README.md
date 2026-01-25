# Flask Backend - Algorithmic Perfumes API

Backend API for the Algorithmic Perfumes project.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

5. Run the Flask application:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

- `GET /` - Health check
- `GET /api/health` - API health check
- `GET /api/perfumes` - Get perfumes (to be implemented)
- `POST /api/perfumes/recommend` - Get perfume recommendations (to be implemented)

## Development

The Flask app runs in debug mode by default when `FLASK_DEBUG=True` in the `.env` file.
