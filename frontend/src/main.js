import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

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
    if (this.ws) this.ws.close()
    this.ws = new WebSocket('ws://localhost:8000/ws')
    this.ws.addEventListener('message', (event) => {
      event = JSON.parse(event.data)

      switch (event.event) {
        case 'message':
          this.messages = [...this.messages, event.message]
          break
        case 'channelChange':
          this.currentChannel = event.channel
          break
      }
    })
  }
}).$mount('#app')
