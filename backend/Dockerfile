# Backend Dockerfile – bypasses Nixpacks, uses Python directly
FROM python:3.11-slim

WORKDIR /app

# Copy backend code and data
COPY backend/ ./

RUN pip install --no-cache-dir -r requirements.txt

# Railway sets PORT at runtime
EXPOSE 5000

CMD ["sh", "-c", "gunicorn app:app --bind 0.0.0.0:${PORT:-5000}"]
