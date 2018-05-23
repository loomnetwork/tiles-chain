import {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Contract, Address, LocalAddress, CryptoUtils
} from 'loom-js'

import { TileMapState, TileMapTx } from './proto/dots_pb'

export default class ContractClient {
  private contract: Contract
  public callerAddress: any

  constructor() {}

  async createContract() {
    const privateKey = CryptoUtils.generatePrivateKey()
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

    const client = new Client(
      'default',
      'ws://127.0.0.1:46657/websocket',
      'ws://127.0.0.1:9999/queryws'
    )
    // required middleware
    client.txMiddleware = [
      new NonceTxMiddleware(publicKey, client),
      new SignedTxMiddleware(privateKey)
    ]
    // address of the `TileChain` smart contract on the Loom DAppChain
    const contractAddr = await client.getContractAddressAsync('TileChain')

    this.callerAddress = new Address(client.chainId, LocalAddress.fromPublicKey(publicKey))
    this.contract = new Contract({
      contractAddr,
      callerAddr: this.callerAddress,
      client
    })
  }

  async setTileMapState(data: string) {
    const setTileMapState = new TileMapTx()
    setTileMapState.setData(data)
    await this.contract.callAsync('SetTileMapState', setTileMapState)
  }

  async getTileMapState(): Promise<any> {
    return await this.contract.staticCallAsync('GetTileMapState', new TileMapState(), new TileMapState())
  }
}
