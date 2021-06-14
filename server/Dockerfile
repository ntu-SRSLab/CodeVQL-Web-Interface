FROM node:lts-alpine as build-stage
WORKDIR /server
COPY package*.json ./
RUN npm install

COPY . .
ENV SOCKET_SRV_PORT 3000
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]