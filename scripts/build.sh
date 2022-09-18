#!/bin/bash
NODE_ENV=production next build && tsc --project tsconfig.server.json && tsc-alias --project tsconfig.server.json
