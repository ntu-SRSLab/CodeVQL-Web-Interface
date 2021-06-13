#!/usr/bin/env sh
DIST_PATH=$PWD/dist
npm run build -- --mode production
#rsync -r dist "$DIST_PATH"
cd "$DIST_PATH"  || exit
echo -n "evome.facta.xyz" > CNAME
git init
git add -A && git commit -m "Deploy" && git push -f git@github.com:ntu-SRSLab/evome-web-pages.git main:gh-pages && cd -

