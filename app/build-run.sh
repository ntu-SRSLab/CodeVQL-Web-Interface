#!/usr/bin/env sh
docker build -t evome-webui .
docker run -d --rm --name evome-webui -p 8080:80 evome-webui