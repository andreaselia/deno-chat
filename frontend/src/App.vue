<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$ws.addEventListener('message', (event) => {
      event = JSON.parse(event.data)

      switch (event.event) {
        case 'message':
          this.$store.dispatch('addMessage', event.message)
          break
        case 'channelChange':
          this.$store.dispatch('joinChannel', event.channel)
          break
      }
    })
  }
}
</script>
