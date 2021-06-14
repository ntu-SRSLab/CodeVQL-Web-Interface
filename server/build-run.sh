#!/usr/bin/env sh
docker build -t evome-server .
docker run -d --rm --name evome-server -p 3000:3000 evome-server