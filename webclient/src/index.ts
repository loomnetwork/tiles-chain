/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts"/>

import 'pixi'
import 'p2'
import * as Phaser from 'phaser'
import Config from './config'
import ContractClient from './contract_client'
import Events from './events'

interface UserColor {
  r: number
  g: number
  b: number
}

class SimpleGame {
  protected game: Phaser.Game
  protected logo: Phaser.Sprite
  protected cursors: Phaser.CursorKeys
  protected userColor: UserColor
  protected contractClient: ContractClient
  protected events: Events

  constructor() {
    this.game = new Phaser.Game(Config.width, Config.height, Phaser.AUTO, "content", this)
  }

  preload() {
    this.contractClient = new ContractClient()
    this.events = new Events()
  }

  create() {
    this.game.input.mouse.onMouseDown = this.onMouseDown.bind(this)
    this.userColor = {r: 255, g: 0, b: 0}
  }

  onMouseDown(mouseEv: MouseEvent) {
    this.contractClient.createDot(mouseEv.x, mouseEv.y, this.userColor.r, this.userColor.g, this.userColor.b)
      .then(() => {
        const bmp = this.game.add.bitmapData(10, 10)
        bmp.fill(this.userColor.r, this.userColor.g, this.userColor.b)
        const box = this.game.add.sprite(mouseEv.x , mouseEv.y, bmp)
        box.anchor.set(1.5, 1.5)
      }).then(() => {
        console.log(this.contractClient.callerAddress)
        // this.contractClient.getDot()
      })
  }
}

window.onload = () => {
  const game = new SimpleGame()
}
