#!/bin/bash
# 解决ts-node不支持alias：https://juejin.cn/post/6963800542615175182
# NODE_ENV 默认为 development, 使用 APP_ENV 用于识别当前 config 环境
# NODE_ENV=development APP_ENV=development ts-node -r tsconfig-paths/register --project tsconfig.server.dev.json bin/app.dev.ts --port 8080
nodemon
