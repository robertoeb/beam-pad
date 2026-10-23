#!/usr/bin/env bash
# Regenerate launcher + splash PNGs from the SVG sources (requires rsvg-convert).
set -euo pipefail
cd "$(dirname "$0")/.."
for name in icon adaptive-icon adaptive-icon-monochrome; do
  rsvg-convert -w 1024 -h 1024 "assets/${name}.svg" -o "assets/${name}.png"
  echo "assets/${name}.png"
done
