<template>
  <div class="max-w-3xl mx-auto py-12 sm:px-6 lg:px-8">
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            Deno Chat ({{ channels[currentChannel].name }})
        </h3>
      </div>
      <div class="px-4 py-5 sm:p-6">
        <div class="text-sm leading-5 text-gray-500">
          <div v-for="(message, index) in messages" :key="index">
            <p>{{ message }}</p>
          </div>
        </div>

        <div class="mt-5">
          <form @submit.prevent="submit" class="flex justify-between items-center">
            <div class="relative rounded-md shadow-sm flex-grow">
              <input id="email" v-model="$store.state.message" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="Message">
            </div>

            <span class="mt-3 inline-flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto">
              <button type="submit" class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 sm:w-auto sm:text-sm sm:leading-5">
                Send Message
              </button>
            </span>
          </form>
        </div>
      </div>

      <div class="px-4 py-5 border-t border-gray-200 sm:px-6">
        <nav class="flex justify-between items-center space-x-2">
          <button
            v-for="(channel, index) in channels"
            v-bind:key="index"
            v-bind:class="[currentChannel === index ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 focus:bg-gray-200' : 'text-gray-600 hover:bg-gray-50 focus:text-gray-900 focus:bg-gray-50']"
            class="px-3 py-2 flex-grow text-center text-sm leading-5 font-medium rounded-md hover:text-gray-900 focus:outline-none transition ease-in-out duration-150"
            type="button"
            @click="changeChannel(index)"
          >
            {{ channel.name }}
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      ws: null
    }
  },
  computed: {
    ...mapGetters([
      'channels',
      'currentChannel',
      'messages'
    ])
  },
  methods: {
    submit () {
      this.$store.dispatch('message')
    },
    changeChannel (channel) {
      this.$store.dispatch('channel', channel)
    }
  }
}
</script>
