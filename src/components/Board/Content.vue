<template>
  <div ref="boardContent" class="qkb-board-content">
    <div ref="boardBubbles" class="qkb-board-content__bubbles">
      <message-bubble
        v-for="(item, index) in mainData"
        :key="index"
        :message="item"
      ></message-bubble>
      <div v-if="botTyping" class="qkb-board-content__bot-typing">
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
    MessageTyping,
  },

  props: {
    mainData: {
      type: Array,
      required: true,
    },

    botTyping: {
      type: Boolean,
      default: false,
    },
  },

  mounted () {
    this.updateScroll()
  },

  watch: {
    mainData: {
      handler: function () {
        this.$nextTick(() => {
          this.updateScroll()
        })
      },
      deep: true
    },
  },

  methods: {
    updateScroll () {
      const contentElm = this.$refs.boardContent
      const offsetHeight = this.$refs.boardBubbles.offsetHeight

      contentElm.scrollTop = offsetHeight
    },
  },
}
</script>
