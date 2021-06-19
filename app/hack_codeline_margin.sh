#!/usr/bin/env sh
sed -i 's/pre{margin-top:0;margin-bottom:1rem;/pre{margin-top:0;/'  "$(find dist/css -iname "app.*.css")"
