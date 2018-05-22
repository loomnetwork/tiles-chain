package main

import (
	"encoding/json"
	"log"
	"types"

	"github.com/loomnetwork/go-loom/plugin"
	contract "github.com/loomnetwork/go-loom/plugin/contractpb"
	"github.com/pkg/errors"
)

func main() {
	plugin.Serve(Contract)
}

type TileChain struct {
}

func (e *TileChain) Meta() (plugin.Meta, error) {
	return plugin.Meta{
		Name:    "TileChain",
		Version: "0.0.1",
	}, nil
}

func (e *TileChain) Init(ctx contract.Context, req *plugin.Request) error {
	return nil
}

func (e *TileChain) GetTileMapState(ctx contract.StaticContext, _ *types.TileMapTx) (*types.TileMapState, error) {
	var curState types.TileMapState
	if err := ctx.Get([]byte("TileMapState"), &curState); err != nil {
		return &curState, nil
	}
	return &curState, nil
}

func (e *TileChain) SetTileMapState(ctx contract.Context, tileMapTx *types.TileMapTx) error {
	state := &types.TileMapState{
		Data: tileMapTx.GetData(),
	}

	if err := ctx.Set([]byte("TileMapState"), state); err != nil {
		return errors.Wrap(err, "Error setting state")
	}

	emitMsg := struct {
		Data   string
		Method string
	}{tileMapTx.GetData(), "onTileMapStateUpdate"}

	emitMsgJSON, err := json.Marshal(emitMsg)

	if err != nil {
		log.Println("Error marshalling emit message")
	}

	ctx.Emit(emitMsgJSON)

	return nil
}

var Contract plugin.Contract = contract.MakePluginContract(&TileChain{})
