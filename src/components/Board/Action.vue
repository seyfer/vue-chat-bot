<template>
  <div :class="actionClass" class="qkb-board-action">
    <div class="qkb-board-action__wrapper">
      <div class="qkb-board-action__msg-box">
        <input
          ref="qkbMessageInput"
          v-model="messageText"
          :disabled="inputDisable"
          :placeholder="inputPlaceholder"
          class="qkb-board-action__input"
          type="text"
          @keydown.enter="sendMessage"
        />
        <div
          v-if="inputDisablePlaceholder && inputDisable"
          class="qkb-board-action__disable-text"
        >
          <span>{{ inputDisablePlaceholder }}</span>
        </div>
      </div>
      <div class="qkb-board-action__extra">
        <slot name="actions"></slot>
        <button class="qkb-action-item qkb-action-item--send" @click="sendMessage">
          <slot name="sendButton">
            <img class="qkb-action-icon qkb-action-icon--send" src="@/assets/icons/send.svg" />
          </slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputPlaceholder: {
      type: String,
    },

    inputDisablePlaceholder: {
      type: String,
    },

    inputDisable: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      messageText: null,
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
    },
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
    },
  },
}
</script>
