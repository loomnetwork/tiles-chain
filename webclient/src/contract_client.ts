import {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Contract, Address, LocalAddress, CryptoUtils
} from 'loom-js'

import { CreateDotTx } from './proto/dots_pb'

export default class ContractClient {
  private contract: Contract

  constructor() {
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
    // address of the `helloworld` smart contract on the Loom DAppChain
    const contractAddr = new Address(
      client.chainId,
      LocalAddress.fromHexString('0x005B17864f3adbF53b1384F2E6f2120c6652F779')
    )
    const callerAddr = new Address(client.chainId, LocalAddress.fromPublicKey(publicKey))
    this.contract = new Contract({
      contractAddr,
      callerAddr,
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
