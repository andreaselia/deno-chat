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
          console.log(123)
          this.$store.messages = [...this.$store.messages, event.message]
          break
        case 'channelChange':
          console.log(123)
          this.$store.currentChannel = event.channel
          break
      }
    })
  }
}
</script>
