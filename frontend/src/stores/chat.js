import { defineStore } from 'pinia'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    channels: {
      general: { name: 'General' },
      random: { name: 'Random' },
      deno: { name: 'Deno' },
      typescript: { name: 'TypeScript' },
      javascript: { name: 'JavaScript' }
    },
    currentChannel: 'general',
    messages: []
  }),
  getters: {},
  actions: {
    changeChannel(channel) {
      this.currentChannel = channel
    },
    sendMessage(message) {
      this.messages.push(message)
    }
  }
})
