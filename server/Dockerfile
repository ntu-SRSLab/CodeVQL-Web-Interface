FROM node:lts-alpine as build-stage
WORKDIR /server
COPY package*.json ./
RUN npm install

COPY . .
ENV SOCKET_SRV_PORT 80
EXPOSE 80
ENTRYPOINT ["node", "server.js"]