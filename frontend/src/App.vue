<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      ws: null
    }
  },
  created () {
    this.ws = new WebSocket('ws://localhost:8000/ws')
    this.ws.addEventListener('message', (event) => {
      event = JSON.parse(event.data)

      switch (event.event) {
        case 'message':
          this.$store.messages = [...this.$store.messages, event.message]
          break
        case 'channelChange':
          this.$store.currentChannel = event.channel
          break
      }
    })
  }
}
</script>
