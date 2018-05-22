/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts"/>

import 'pixi'
import 'p2'
import * as Phaser from 'phaser'
import Config from './config'
import ContractClient from './contract_client'
import Events from './events'
import { CryptoUtils } from 'loom-js'
import config from './config';

interface Color {
  r: number
  g: number
  b: number
}

interface Point {
  x: number
  y: number
}

interface Tile {
  color: Color
  point: Point
}

interface TileMap {
  tiles: Tile[]
}

const colors:Color[] = [
  {r: 255, g: 0  , b: 0  },
  {r: 255, g: 0  , b: 255},
  {r: 255, g: 255, b: 0  },
  {r: 0  , g: 255, b: 0  },
  {r:   0, g: 255, b: 255},
  {r:   0, g: 0  , b: 255}
]

class SimpleGame {
  protected game: Phaser.Game
  protected logo: Phaser.Sprite
  protected cursors: Phaser.CursorKeys
  protected userColor: Color
  protected contractClient: ContractClient
  protected events: Events
  protected tileMap: TileMap

  constructor() {
    this.game = new Phaser.Game(Config.width, Config.height, Phaser.AUTO, "content", this)
    this.contractClient = new ContractClient()
    this.events = new Events()
  }

  create() {
    this.userColor = colors[this.game.rnd.integerInRange(0, 5)]
    this.tileMap = {tiles: []}
    this.game.input.mouse.onMouseDown = this.onMouseDown.bind(this)
    this.updateTilesOnCanvas()
  }

  drawTile(x: number, y: number, r: number, g: number, b: number) {
    const bmp = this.game.add.bitmapData(10, 10)
    bmp.fill(r, g, b)
    const box = this.game.add.sprite(x, y, bmp)
    box.anchor.set(1.5, 1.5)
  }

  async updateTilesOnCanvas() {
    const tileMapState = await this.contractClient.getTileMapState()
    const tileData = tileMapState.getData()

    if (tileData) {
      this.tileMap = JSON.parse(tileData)
      this.tileMap.tiles.forEach((tile: Tile) => {
        this.drawTile(tile.point.x, tile.point.y, tile.color.r, tile.color.g, tile.color.b)
      })
    }
  }

  async setTileMap(x: number, y: number) {
    this.tileMap.tiles.push({
      point: {
        x,
        y
      },
      color: {
        r: this.userColor.r,
        g: this.userColor.g,
        b: this.userColor.b
      }
    })

    await this.contractClient.setTileMapState(JSON.stringify(this.tileMap))
  }

  async onMouseDown(mouseEv: MouseEvent) {
    this.updateTilesOnCanvas()
    this.setTileMap(mouseEv.x, mouseEv.y)
    this.drawTile(mouseEv.x , mouseEv.y, this.userColor.r, this.userColor.g, this.userColor.b)
  }
}

window.onload = () => {
  const game = new SimpleGame()
}
