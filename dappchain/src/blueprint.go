package main

import (
	"encoding/json"
	"log"
	"types"

	"github.com/loomnetwork/go-loom/plugin"
	contract "github.com/loomnetwork/go-loom/plugin/contractpb"
	"github.com/pkg/errors"
	uuid "github.com/satori/go.uuid"
)

func main() {
	plugin.Serve(Contract)
}

type BluePrint struct {
}

func (e *BluePrint) Meta() (plugin.Meta, error) {
	return plugin.Meta{
		Name:    "BluePrint",
		Version: "0.0.1",
	}, nil
}

func (e *BluePrint) Init(ctx contract.Context, req *plugin.Request) error {
	return nil
}

func (e *BluePrint) GetDotTx(ctx contract.StaticContext, accTx *types.DotState) (*types.DotState, error) {
	if ctx.Has([]byte(accTx.Owner)) {
		var curState types.DotState
		if err := ctx.Get([]byte(accTx.Owner), &curState); err != nil {
			return nil, err
		}
		return &curState, nil
	}
	return nil, nil
}

func (e *BluePrint) CreateDotTx(ctx contract.Context, accTx *types.CreateDotTx) error {
	owner := ctx.Message().Sender.Local.Hex()

	dotUUID, err := getUUID()
	if err != nil {
		return err
	}

	state := &types.DotState{
		Owner: owner,
		Uuid:  dotUUID,
		X:     accTx.X,
		Y:     accTx.Y,
		R:     accTx.R,
		G:     accTx.G,
		B:     accTx.B,
	}

	if err := ctx.Set([]byte(dotUUID), state); err != nil {
		return errors.Wrap(err, "Error setting state")
	}

	emitMsg := struct {
		Owner string
		Uuid  string
		X     uint32
		Y     uint32
		R     uint32
		G     uint32
		B     uint32
	}{owner, dotUUID, accTx.X, accTx.Y, accTx.R, accTx.G, accTx.B}

	emitMsgJSON, err := json.Marshal(emitMsg)

	if err != nil {
		log.Println("Error marshalling emit message")
	}

	ctx.Emit(emitMsgJSON)

	return nil
}

func getUUID() (string, error) {
	// or error handling
	UUIDv4, err := uuid.NewV4()
	if err != nil {
		return "", errors.Wrap(err, "Error generate UUID")
	}

	return UUIDv4.String(), nil
}

var Contract plugin.Contract = contract.MakePluginContract(&BluePrint{})
