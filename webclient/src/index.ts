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
  protected userColor: Color
  protected contractClient: ContractClient
  protected events: Events
  protected tileMap: TileMap

  constructor() {
    this.game = new Phaser.Game(Config.width, Config.height, Phaser.AUTO, "content", this)
    this.contractClient = new ContractClient()
    this.events = new Events()
  }

  async create() {
    await this.contractClient.createContract()

    // get an random color for the user
    this.userColor = colors[this.game.rnd.integerInRange(0, 5)]

    // initialize map
    this.tileMap = {tiles: []}

    // listen for mouse event
    this.game.input.mouse.onMouseDown = mouseEvent => this.onMouseDown(mouseEvent)

    // subscribe for tile map updates from websocket
    this.events.onEvent = tileData => this.drawTiles(tileData)

    // request state update
    this.requestUpdateTilesOnCanvas()
  }

  async onMouseDown(mouseEv: MouseEvent) {
    try {
      await this.setTileMap(mouseEv.x, mouseEv.y)
      this.drawTile(mouseEv.x , mouseEv.y, this.userColor.r, this.userColor.g, this.userColor.b)
    } catch (err) {
      console.error('something wrong', err)
    }
  }

  // draw tiles from JSON
  drawTiles(tileData: any) {
    this.tileMap = JSON.parse(tileData)
    this.tileMap.tiles.forEach((tile: Tile) => {
      this.drawTile(tile.point.x, tile.point.y, tile.color.r, tile.color.g, tile.color.b)
    })
  }

  // Draw a single tile
  drawTile(x: number, y: number, r: number, g: number, b: number) {
    const bmp = this.game.add.bitmapData(10, 10)
    bmp.fill(r, g, b)
    const box = this.game.add.sprite(x, y, bmp)
    box.anchor.set(1.5, 1.5)
  }

  // Used when request an update without web sockets
  async requestUpdateTilesOnCanvas() {
    const tileMapState = await this.contractClient.getTileMapState()
    const tileData = tileMapState.getData()

    if (tileData) {
      this.drawTiles(tileData)
    }
  }

  // push new tile to tile map state
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

    // send the transaction
    await this.contractClient.setTileMapState(JSON.stringify(this.tileMap))
  }
}

window.onload = () => {
  const game = new SimpleGame()
}
