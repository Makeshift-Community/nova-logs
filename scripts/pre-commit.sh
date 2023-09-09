#!/bin/sh

# Exit on any error
set -e

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" = "stable" ]; then

  # 1. Lint all files
  npm run lint

  # 2. Rebuild dist/
  rm -rf dist/
  npm run build
  
  # 3. When on stable branch, force add dist/
  git add -f dist/
  
fi
