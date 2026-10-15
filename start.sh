#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -d "$ROOT_DIR/backend/node_modules" ]; then
  echo "[setup] Installing backend dependencies..."
  npm --prefix "$ROOT_DIR/backend" install --no-audit --no-fund
fi

if [ ! -d "$ROOT_DIR/frontend/node_modules" ]; then
  echo "[setup] Installing frontend dependencies..."
  npm --prefix "$ROOT_DIR/frontend" install --no-audit --no-fund
fi

cleanup() {
  if [ -n "$BACKEND_PID" ]; then
    echo "[stop] Shutting down backend API (pid $BACKEND_PID)..."
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "[start] Launching backend API on http://localhost:3001"
node "$ROOT_DIR/backend/src/server.js" &
BACKEND_PID=$!

echo "[start] Launching frontend on http://localhost:5173"
npm --prefix "$ROOT_DIR/frontend" run dev
