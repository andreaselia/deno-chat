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
    sendMessage (state, message) {
      this._vm.$wsSend({
        event: 'message',
        channel: state.currentChannel,
        message: state.message
      })

      state.message = ''
    },
    changeChannel (state, channel) {
      state.messages = []
      state.currentChannel = channel

      this._vm.$wsSend({
        event: 'changeChannel',
        channel: state.currentChannel
      })
    },
    addMessage (state, message) {
      state.messages = [...state.messages, message]
    },
    joinChannel (state, channel) {
      state.currentChannel = channel
    },
    updateMessage (state, message) {
      state.message = message
    }
  },
  actions: {
    sendMessage ({ commit }) {
      commit('sendMessage')
    },
    changeChannel ({ commit }, channel) {
      commit('changeChannel', channel)
    },
    addMessage ({ commit }, message) {
      commit('addMessage', message)
    },
    joinChannel ({ commit }, channel) {
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
