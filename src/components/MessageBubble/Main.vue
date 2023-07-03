<template>
  <div class="qkb-msg-bubble" :class="bubbleClass">
    <div class="qkb-msg-avatar" v-if="message.agent === 'bot'">
      <div class="qkb-msg-avatar__img">&nbsp;</div>
    </div>
    <component v-if="componentType" :is="componentType" :main-data="message"></component>
    <div class="qkb-msg-bubble__time" v-if="message.createdAt">{{ message.createdAt }}</div>
  </div>
</template>

<script>
import SingleText from './SingleText'
import ButtonOptions from './ButtonOptions'

export default {
  components: {
    SingleText,
    ButtonOptions
  },

  props: {
    message: {
      type: Object
    }
  },

  computed: {
    bubbleClass () {
      return this.message.agent === 'bot'
        ? 'qkb-msg-bubble--bot'
        : 'qkb-msg-bubble--user'
    },

    // Define the message type and return the specific component
    componentType () {
      let type = ''

      switch (this.message.type) {
        case 'button':
          type = 'ButtonOptions'
          break
        default:
          type = 'SingleText'
      }

      return type
    }
  }
}
</script>
