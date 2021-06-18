FROM maven:3.8.1-openjdk-8 as build-stage

# install node and python
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt update && apt install -y nodejs python3 libgomp1
WORKDIR /server
COPY package*.json ./
RUN npm install

# copy contents, install souffle and build translator
COPY . .
# WORKDIR /server/evome-dep
# RUN git clone --branch 2.0.2 --depth 1 https://github.com/souffle-lang/souffle
# RUN ./build-souffle.sh
RUN cp -r /server/evome-dep/prefix/* /
RUN cp /server/evome-dep/libffi.so.7.1.0 /usr/lib/x86_64-linux-gnu/libffi.so.7

# WORKDIR /server/evome-dep/EvoMe/translator
# RUN make

# set env and run
WORKDIR /server
ENV M2_HOME=/usr/share/maven
ENV BASE_PATH=/server/evome-dep
ENV OUT_PATH=/output
RUN mkdir -p /output/query
ENV LOG_LEVEL=info
ENV NO_CLI_BANNER=1
ENV REPO_STORAGE=/repo-storage
ENV SOCKET_SRV_PORT=3000
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]