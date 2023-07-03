<template>
  <div class="qkb-board-content" ref="boardContent">
    <div class="qkb-board-content__bubbles" ref="boardBubbles">
      <message-bubble
        v-for="(item, index) in mainData"
        :key="index"
        :message="item"
      ></message-bubble>
      <div class="qkb-board-content__bot-typing" v-if="botTyping">
        <slot name="botTyping">
          <message-typing></message-typing>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import MessageBubble from '../MessageBubble/Main'
import MessageTyping from '../MessageBubble/Typing'

export default {
  components: {
    MessageBubble,
    MessageTyping
  },

  props: {
    mainData: {
      type: Array,
      required: true
    },

    botTyping: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    this.updateScroll()
  },

  watch: {
    mainData: function (newVal) {
      this.$nextTick(() => {
        this.updateScroll()
      })
    }
  },

  methods: {
    updateScroll () {
      const contentElm = this.$refs.boardContent
      const offsetHeight = this.$refs.boardBubbles.offsetHeight

      contentElm.scrollTop = offsetHeight
    }
  }
}
</script>
