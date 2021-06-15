FROM maven:3.8.1-openjdk-8 as build-stage

# install node and python
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt update && apt install -y nodejs python3
WORKDIR /server
COPY package*.json ./
RUN npm install

# copy contents and install souffle
COPY . .
RUN cp -r /server/evome-dep/prefix/* /

# set env and run
ENV M2_HOME=/usr/share/maven
ENV BASE_PATH=/server/evome-dep
ENV OUT_PATH=/output
ENV SOCKET_SRV_PORT=3000
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]