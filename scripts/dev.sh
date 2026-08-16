#!/bin/bash
export PATH="/Users/aleck/.nvm/versions/node/v22.14.0/bin:$PATH"
cd "$(dirname "$0")/.."
exec pnpm dev
