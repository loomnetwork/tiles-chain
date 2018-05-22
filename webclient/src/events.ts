export default class Events {
  private ws: WebSocket
  public onEvent: Function

  constructor() {
    // open new websocket connection
    this.ws = new WebSocket('ws://127.0.0.1:9999/queryws')

    this.ws.onopen = () => {

      // subscribe to events
      this.ws.send(JSON.stringify({
        method: 'subevents',
        jsonrpc: '2.0',
        params: [],
        id: 'events'
      }))

      // on new event
      this.ws.onmessage = event => this.onMessage(event)
    }
  }

  onMessage(event) {
    const data = JSON.parse(event.data)
    const encodedData = data.result.encodedData

    // there's an useful encoded that
    if (encodedData) {
      const dAppEvent = JSON.parse(atob(encodedData))

      // tile map state updated
      if (this.onEvent && dAppEvent.Method == 'onTileMapStateUpdate') {
        this.onEvent(dAppEvent.Data)
      }
    }
  }
}
