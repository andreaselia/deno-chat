const websocket = {}

websocket.install = function (Vue, options) {
  let ws = new WebSocket(options.url)
  let reconnectInterval = options.reconnectInterval || 1000

  Vue.prototype.$wsConnect = () => {
    ws = new WebSocket(options.url)

    ws.onopen = () => {
      reconnectInterval = options.reconnectInterval || 1000
    }

    ws.onmessage = (event) => {
      event = JSON.parse(event.data)

      if (event.event === 'message') {
        options.store.dispatch('addMessage', event.message)
      } else if (event.event === 'channelChange') {
        options.store.dispatch('joinChannel', event.channel)
      }
    }

    ws.onclose = (event) => {
      if (event) {
        if (event.code !== 1000) {
          const maxReconnectInterval = options.maxReconnectInterval || 3000

          setTimeout(() => {
            if (reconnectInterval < maxReconnectInterval) {
              reconnectInterval += 1000
            }

            Vue.prototype.$wsConnect()
          }, reconnectInterval)
        }
      }
    }

    ws.onerror = (error) => {
      console.log(error)
      ws.close()
    }
  }

  Vue.prototype.$wsDisconnect = () => {
    ws.close()
  }

  Vue.prototype.$wsSend = (data) => {
    console.log('send', data)
    ws.send(JSON.stringify(data))
  }
}

export default websocket
