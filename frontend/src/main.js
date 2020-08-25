import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ws from './ws'
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

Vue.use(ws, {
  store,
  url: 'ws://localhost:8000/ws'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
