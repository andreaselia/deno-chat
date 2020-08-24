import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

Vue.prototype.ws = new WebSocket('ws://localhost:8000/ws')

new Vue({
  router,
  store,
  render: h => h(App),
  data () {
    return {
      ws: null
    }
  },
  created () {
    this.$ws.addEventListener('message', (event) => {
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
}).$mount('#app')
