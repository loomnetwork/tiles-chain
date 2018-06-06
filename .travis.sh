#!/bin/bash

cd dappchain
export GOPATH=$GOPATH:`pwd`
make deps
make
