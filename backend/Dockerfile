# Backend Dockerfile – bypasses Nixpacks, uses Python directly
FROM python:3.11-slim

WORKDIR /app

# Copy backend code and data
COPY backend/ ./

RUN pip install --no-cache-dir -r requirements.txt

# Railway sets PORT at runtime
EXPOSE 5000

# Use shell form for environment variable expansion
CMD gunicorn app:app --bind 0.0.0.0:$PORT
