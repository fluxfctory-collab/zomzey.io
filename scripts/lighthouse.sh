#!/usr/bin/env bash
# Lab-only performance check against the production preview (not field data).
# Usage: npm run build && bash scripts/lighthouse.sh [runs]
set -euo pipefail
RUNS="${1:-3}"
OUT=tests/artifacts
mkdir -p "$OUT"
export CHROME_PATH="${CHROME_PATH:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}"
npx vite preview --port 4173 --strictPort >/dev/null 2>&1 &
PREVIEW=$!
trap 'kill $PREVIEW 2>/dev/null || true' EXIT
for _ in $(seq 1 30); do curl -s -o /dev/null http://localhost:4173/ && break; sleep 0.5; done
for preset in mobile desktop; do
  for i in $(seq 1 "$RUNS"); do
    extra=""; [ "$preset" = desktop ] && extra="--preset=desktop"
    npx --yes lighthouse@12.8.2 http://localhost:4173/ --quiet $extra \
      --chrome-flags="--headless=new --no-sandbox" \
      --only-categories=performance,accessibility,best-practices,seo \
      --output=json --output-path="$OUT/lighthouse-$preset-$i.json" >/dev/null 2>&1
  done
done
