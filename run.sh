#!/usr/bin/env bash
export PORT=YOUR-PORT
export PARSE_APPID=YOUR-PARSE_APP_ID
export PARSE_JSKEY=YOUR-PARSE_JS_KEY
export PARSE_CLASS=YOUR-PARSE_CLASS_NAME

printf "Your $0 configurations:\n\n"
printf "PORT=$PORT\n"
printf "PARSE_APP_ID=$PARSE_APP_ID\n"
printf "PARSE_JS_KEY=$PARSE_JS_KEY\n"
printf "PARSE_CLASS=$PARSE_CLASS\n\n"

node index.js
