#!/usr/bin/env sh
docker build -t evome-webui .
docker run -d --rm --name evome-webui -p 80:80 evome-webui