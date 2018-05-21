import {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Contract, Address, LocalAddress, CryptoUtils
} from 'loom-js'

import { CreateDotTx } from './proto/dots_pb'

export default class ContractClient {
  private contract: Contract
  public callerAddress: any

  constructor() {
    this.createContract()
  }

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
    // address of the `BluePrint` smart contract on the Loom DAppChain
    const contractAddr = await client.getContractAddressAsync('BluePrint')

    this.callerAddress = new Address(client.chainId, LocalAddress.fromPublicKey(publicKey))
    this.contract = new Contract({
      contractAddr,
      callerAddr: this.callerAddress,
      client
    })
  }

  async createDot(x: number, y: number, r: number, g: number, b: number) {
    const createDot = new CreateDotTx()
    createDot.setX(x)
    createDot.setY(y)
    createDot.setR(r)
    createDot.setG(g)
    createDot.setB(b)
    await this.contract.callAsync('CreateDotTx', createDot)
  }
}
