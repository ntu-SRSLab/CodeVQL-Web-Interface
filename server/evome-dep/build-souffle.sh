#!/usr/bin/env sh
sudo apt install autoconf automake bison build-essential clang doxygen flex g++ git libffi-dev libncurses5-dev libtool libsqlite3-dev make mcpp python sqlite zlib1g-dev
cd souffle
sh ./bootstrap
./configure
make
make install
