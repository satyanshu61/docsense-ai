#!/usr/bin/env bash
set -euo pipefail

# Usage: ./push-to-github.sh [REMOTE_URL]
# If REMOTE_URL is omitted the script will prompt for it.

REPO_URL=${1:-}
if [ -z "$REPO_URL" ]; then
  read -p "Enter remote repo URL (https://github.com/your-user/your-repo.git): " REPO_URL
fi

ROOT_DIR="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT_DIR"

echo "Working in repo: $ROOT_DIR"

if [ ! -d .git ]; then
  echo "Initializing new git repository..."
  git init
  git branch -M main || true
fi

if git remote | grep -q '^origin$'; then
  echo "Setting origin to $REPO_URL"
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

git add .
if git commit -m "Initial commit"; then
  echo "Committed changes."
else
  echo "Nothing to commit (no changes)."
fi

echo "Pushing to origin main (you may be prompted for credentials)..."
git push -u origin main

echo "Push complete."
