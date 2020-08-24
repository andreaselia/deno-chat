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
    message (state, message) {
      state.message = ''
    },
    channel (state, channel) {
      state.messages = []
      state.currentChannel = channel
    },
    addMessage (state, message) {
      state.messages = [...state.messages, message]
    },
    joinChannel (state, channel) {
      state.currentChannel = channel
    }
  },
  actions: {
    message ({ commit, state }) {
      this._vm.$ws.send(JSON.stringify({
        event: 'message',
        channel: state.currentChannel,
        message: state.message
      }))

      commit('message')
    },
    channel ({ commit, state }, channel) {
      this._vm.$ws.send(JSON.stringify({
        event: 'changeChannel',
        channel: channel
      }))

      commit('channel', channel)
    },
    addMessage ({ commit, state }, message) {
      commit('addMessage', message)
    },
    joinChannel ({ commit, state }, channel) {
      commit('joinChannel', channel)
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
