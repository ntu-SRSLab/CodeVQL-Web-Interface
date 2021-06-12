FROM node:lts-alpine as build-stage
WORKDIR /server
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]