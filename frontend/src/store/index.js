import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    channels: {
      general: { name: 'General' },
      random: { name: 'Random' },
      deno: { name: 'Deno' },
      typescript: { name: 'TypeScript' },
      javascript: { name: 'JavaScript' }
    },
    currentChannel: 'general',
    messages: [],
    message: ''
  },
  mutations: {
    message (state) {
      //
    },
    channel (state, channel) {
      console.log('channel', channel)
    }
  },
  actions: {
    message ({ commit }) {
      this.ws.send(JSON.stringify({
        event: 'message',
        channel: this.currentChannel,
        message: this.message
      }))

      commit('message')
    },
    channel ({ commit }, channel) {
      this.ws.send(JSON.stringify({
        event: 'changeChannel',
        channel: channel
      }))

      this.messages = []
      this.currentChannel = channel

      commit('channel')
    }
  },
  getters: {
    channels: (state) => state.channels,
    currentChannel: (state) => state.currentChannel,
    messages: (state) => state.messages,
    message: (state) => state.message
  },
  modules: {
  }
})
