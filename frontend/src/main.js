import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

Vue.prototype.$ws = new WebSocket('ws://localhost:8000/ws')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
