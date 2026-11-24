#!/bin/bash

# PortfolioCraft - Startup Script
echo "=========================================================="
echo " Starting PortfolioCraft Full-Stack Platform..."
echo "=========================================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 1. Start FastAPI Backend
echo "-> Starting Backend API (FastAPI) on port 8000..."
cd "$ROOT_DIR/backend"
if [ ! -d "venv" ]; then
    echo "Creating python venv..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
else
    source venv/bin/activate
fi

# Run backend in background
uvicorn main:app --host 127.0.0.1 --port 8000 --reload &
BACKEND_PID=$!
echo "Backend running (PID: $BACKEND_PID)"

# 2. Start Frontend
echo "-> Starting Frontend (Vite + React) on port 5173..."
cd "$ROOT_DIR/frontend"
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Trap SIGINT to kill backend when script terminates
trap "echo 'Shutting down PortfolioCraft...'; kill $BACKEND_PID; exit" SIGINT SIGTERM

npm run dev

# Wait for background processes
wait $BACKEND_PID
