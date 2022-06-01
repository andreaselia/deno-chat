<template>
  <main>
    <div class="max-w-4xl mx-auto my-12">
      <div class="text-center py-4">
        <h3 class="text-md leading-6 font-medium text-gray-900">
          Deno Chat
        </h3>
      </div>

      <div class="sm:grid sm:grid-cols-3 sm:gap-12 sm:px-6 sm:py-5">
        <div class="flex flex-col">
          <button
            v-for="(channel, index) in chat.channels"
            v-bind:key="index"
            v-bind:class="[chat.currentChannel === index ? 'text-blue-900 bg-blue-100 hover:bg-blue-100 focus:bg-blue-200' : 'text-blue-600 hover:bg-blue-50 focus:text-blue-900 focus:bg-blue-50']"
            class="px-3 py-2 text-center text-sm leading-5 font-medium rounded-md hover:text-blue-900 focus:outline-none transition ease-in-out duration-150"
            type="button"
            @click="chat.changeChannel(index)"
          >
            {{ channel.name }}
          </button>
        </div>

        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <div v-for="(message, index) in chat.messages" :key="index">
            <p class="text-sm leading-5 text-gray-500">{{ message }}</p>
          </div>

          <form @submit.prevent="sendMessage" class="flex justify-between items-center">
            <div class="relative rounded-md shadow-sm flex-grow">
              <input type="text" v-model="message" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm sm:leading-5" placeholder="Message">
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
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'

const chat = useChatStore()

const message = ref('')

const sendMessage = () => {
  if (! message) {
    return
  }

  chat.sendMessage(message)
}
</script>
