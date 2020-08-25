<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$wsConnect()

    window.onbeforeunload = () => {
      this.$wsDisconnect()
    }
  }
}
</script>
