#!/bin/bash

set -euxo pipefail

# Create dummy Makefile to avoid automatic dependency install
# https://docs.travis-ci.com/user/languages/go/#Default-Build-Script
touch Makefile

PROTOBUF_VERSION=3.5.1

cd /tmp

# Grab the latest version
curl -OL https://github.com/google/protobuf/releases/download/v${PROTOBUF_VERSION}/protoc-${PROTOBUF_VERSION}-linux-x86_64.zip

# Unzip
unzip protoc-${PROTOBUF_VERSION}-linux-x86_64.zip -d protoc3

# Move protoc to /usr/local/bin/
sudo mv protoc3/bin/* /usr/local/bin/

# Move protoc3/include to /usr/local/include/
sudo mv protoc3/include/* /usr/local/include/
