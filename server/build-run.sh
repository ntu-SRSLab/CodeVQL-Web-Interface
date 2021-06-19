#!/usr/bin/env sh
docker build -t evome-server .
# docker run -d --rm --name evome-server -p 3000:3000 evome-server
docker run --rm --name evome-server -p 3000:3000  -v /home/ec2-user/.local/repo-storage:/repo-storage  evome-server

