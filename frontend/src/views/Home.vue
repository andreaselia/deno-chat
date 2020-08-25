<template>
  <div class="max-w-4xl mx-auto my-12">
    <div class="bg-white shadow sm:rounded-lg">
      <div class="text-center border-b border-gray-200 py-4">
        <h3 class="text-md leading-6 font-medium text-gray-900">
          Deno Chat
        </h3>
      </div>
      <div class="sm:grid sm:grid-cols-3 sm:gap-12 sm:px-6 sm:py-5">
        <div class="flex flex-col">
          <button
            v-for="(channel, index) in channels"
            v-bind:key="index"
            v-bind:class="[currentChannel === index ? 'text-blue-900 bg-blue-100 hover:bg-blue-100 focus:bg-blue-200' : 'text-blue-600 hover:bg-blue-50 focus:text-blue-900 focus:bg-blue-50']"
            class="px-3 py-2 text-center text-sm leading-5 font-medium rounded-md hover:text-blue-900 focus:outline-none transition ease-in-out duration-150"
            type="button"
            @click="changeChannel(index)"
          >
            {{ channel.name }}
          </button>
        </div>
        <div class="brmt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
          <div class="text-sm leading-5 text-gray-500">
            <div v-for="(message, index) in messages" :key="index">
              <p>{{ message }}</p>
            </div>
          </div>

          <form @submit.prevent="sendMessage" class="flex justify-between items-center">
            <div class="relative rounded-md shadow-sm flex-grow">
              <input id="email" v-model="message" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="Message">
            </div>

            <span class="mt-3 inline-flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto">
              <button type="submit" class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 sm:w-auto sm:text-sm sm:leading-5">
                Send Message
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'channels',
      'currentChannel',
      'messages'
    ]),
    message: {
      get () {
        return this.$store.state.message
      },
      set (value) {
        this.$store.commit('updateMessage', value)
      }
    }
  },
  methods: {
    sendMessage () {
      this.$store.dispatch('sendMessage')
    },
    changeChannel (channel) {
      this.$store.dispatch('changeChannel', channel)
    }
  }
}
</script>
