export default class Events {
  private ws: WebSocket

  constructor() {
    this.ws = new WebSocket('ws://127.0.0.1:9999/queryws')
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({
        method: 'subevents',
        jsonrpc: '2.0',
        params: [],
        id: 'dummy'
      }))

      this.ws.onmessage = this.onMessage
    }
  }

  onMessage(event) {
    console.log('event', event)
  }
}
