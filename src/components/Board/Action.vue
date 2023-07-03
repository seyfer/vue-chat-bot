<template>
  <div class="qkb-board-action" :class="actionClass">
    <div class="qkb-board-action__wrapper">
      <div class="qkb-board-action__msg-box">
        <input
          class="qkb-board-action__input"
          type="text"
          v-model="messageText"
          ref="qkbMessageInput"
          :disabled="inputDisable"
          :placeholder="inputPlaceholder"
          @keydown.enter="sendMessage"
        />
        <div
          class="qkb-board-action__disable-text"
          v-if="inputDisablePlaceholder && inputDisable"
        >
          <span>{{ inputDisablePlaceholder }}</span>
        </div>
      </div>
      <div class="qkb-board-action__extra">
        <slot name="actions"></slot>
        <button class="qkb-action-item qkb-action-item--send" @click="sendMessage">
          <slot name="sendButton">
            <IconSend class="qkb-action-icon qkb-action-icon--send"></IconSend>
          </slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IconSend from '../../assets/icons/send.svg'

export default {
  components: {
    IconSend
  },

  props: {
    inputPlaceholder: {
      type: String
    },

    inputDisablePlaceholder: {
      type: String
    },

    inputDisable: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      messageText: null
    }
  },

  computed: {
    actionClass () {
      const actionClasses = []

      if (this.inputDisable) {
        actionClasses.push('qkb-board-action--disabled')
      }

      if (this.messageText) {
        actionClasses.push('qkb-board-aciton--typing')
      }

      // TODO: sending

      return actionClasses
    }
  },

  mounted () {
    this.$refs.qkbMessageInput.focus()
  },

  methods: {
    sendMessage () {
      if (this.messageText) {
        this.$emit('msg-send', { text: this.messageText })
        this.messageText = null
      }
    }
  }
}
</script>
