#!/usr/bin/env bash
set -euo pipefail
npx pbjs -t static-module -w commonjs \
  -o src/proto/bundle.js src/proto/remotemessage.proto src/proto/pairingmessage.proto
npx pbts -o src/proto/bundle.d.ts src/proto/bundle.js
