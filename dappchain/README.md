# Tiles Chain (DAppChain based on weave-blueprint)

Sample Loom Blockchain project *GO Language*

For more info please checkout the docs page for the [Loom SDK](https://loomx.io/developers/docs/en/prereqs.html)

To Build
```bash
export GOPATH=$GOPATH:`pwd`

make deps
make
```

To Run (Requires Loom DAppChain engine binary)

```bash
cd run
./loom init
cp ../genesis.example.json genesis.json
./loom run
```
