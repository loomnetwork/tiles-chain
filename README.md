# Deprecated Repository

This repository is **deprecated and no longer maintained**. Head over to the [Truffle DappChain Example](https://github.com/loomnetwork/truffle-dappchain-example) repository to learn how to build a simple web UI that interacts with Loom PlasmaChain.


# Tiles Chain [![Build Status](https://travis-ci.org/loomnetwork/tiles-chain.svg?branch=master)](https://travis-ci.org/loomnetwork/tiles-chain)

A basic example showcasing a simple HTML5 + WebSockets interacting with a Loom DappChain, using [Phaser](http://phaser.io) and [Loom.js](https://github.com/loomnetwork/loom-js).

![](https://camo.githubusercontent.com/9d49b0ce78d692e69d1dd571bc8d1aafe5b806a8/68747470733a2f2f647a776f6e73656d72697368372e636c6f756466726f6e742e6e65742f6974656d732f315232363044327030713370304d33693232304a2f53637265656e2532305265636f7264696e67253230323031382d30352d3232253230617425323031302e3233253230414d2e6769663f763d3961353539316139)


Game instructions
----

Use the mouse cursor to click on the black canvas area to create colored tiles, each new player will have a different color the canvas which is shared amongst all players

Development
----

### 1.) Run your own DappChain

Please consult the [Loom SDK docs](https://loomx.io/developers/docs/en/prereqs.html) for further instruction on running your own DappChain.

### 2.) Download the example project (Tiles Chain)

```bash
git clone https://github.com/loomnetwork/tiles-chain
```

### 3.) Start the DappChain

```bash
cd tiles-chain
mkdir tmpgopath
export GOPATH=`pwd`/tmpgopath

cd dappchain
wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-404/loom
chmod +x loom

# Compile
export GOPATH=$GOPATH:`pwd`
make deps
make

# Configure
cd build
../loom init
cp ../genesis.example.json genesis.json

# Run
../loom run
```

### 4.) Start the web server

```bash
# On second terminal
cd tiles-chain/webclient

# Install
yarn

# Compile protobuf
yarn run proto

# Start the demo
yarn start

```

### 5.) Running

The Tiles-Chain web interface will be available on `http://localhost:9000`

Loom Network
----
[https://loomx.io](https://loomx.io)


License
----

MIT
