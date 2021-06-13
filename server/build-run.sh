#!/usr/bin/env sh
docker build -t evome-server .
docker run -d --rm -p 80:80 evome-server