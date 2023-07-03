<template>
  <div :class="uiClasses" class="qkb-bot-ui">
    <transition name="qkb-fadeUp">
      <div v-if="botActive" class="qkb-board">
        <BoardHeader :bot-title="optionsMain.botTitle" @close-bot="botToggle">
          <template v-slot:header>
            <slot name="header"></slot>
          </template>
        </BoardHeader>
        <BoardContent :bot-typing="botTyping" :main-data="messages" />
        <BoardAction
          :input-disable="inputDisable"
          :input-disable-placeholder="optionsMain.inputDisablePlaceholder"
          :input-placeholder="optionsMain.inputPlaceholder"
          @msg-send="sendMessage"
        />
      </div>
    </transition>
    <div class="qkb-bot-bubble">
      <button class="qkb-bubble-btn" @click="botToggle">
        <slot name="bubbleButton">
          <transition name="qkb-scaleUp">
            <img v-if="!botActive" key="1" class="qkb-bubble-btn-icon" src="@/assets/icons/bubble.svg" />
            <img v-else key="2" class="qkb-bubble-btn-icon qkb-bubble-btn-icon--close" src="@/assets/icons/close.svg" />
          </transition>
        </slot>
      </button>
    </div>
    <AppStyle :options="optionsMain" />
    <div class="qkb-preload-image">
      <div v-if="optionsMain.botAvatarImg" class="qkb-msg-avatar__img"></div>
    </div>
  </div>
</template>

<script>
import EventBus from '../helpers/event-bus'
import BoardHeader from './Board/Header'
import BoardContent from './Board/Content'
import BoardAction from './Board/Action'
import AppStyle from './AppStyle'

export default {
  name: 'VueBotUI',

  components: {
    BoardHeader,
    BoardContent,
    BoardAction,
    AppStyle,
  },

  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      },
    },

    messages: {
      type: Array,
    },

    botTyping: {
      type: Boolean,
      default: false,
    },

    inputDisable: {
      type: Boolean,
      default: false,
    },

    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      botActive: false,
      defaultOptions: {
        botTitle: 'Chatbot',
        colorScheme: '#1b53d0',
        textColor: '#fff',
        bubbleBtnSize: 56,
        animation: true,
        boardContentBg: '#fff',
        botAvatarSize: 32,
        botAvatarImg: 'http://placehold.it/200x200',
        msgBubbleBgBot: '#f0f0f0',
        msgBubbleColorBot: '#000',
        msgBubbleBgUser: '#4356e0',
        msgBubbleColorUser: '#fff',
        inputPlaceholder: 'Message',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: null,
      },
    }
  },

  computed: {
    optionsMain () {
      return { ...this.defaultOptions, ...this.options }
    },

    // Add class to bot ui wrapper
    uiClasses () {
      const classes = []

      if (this.optionsMain.animation) {
        classes.push('qkb-bot-ui--animate')
      }

      return classes
    },
  },

  created () {
    this.initBot()
  },

  mounted () {
    EventBus.on('select-button-option', this.selectOption)
  },

  beforeUnmount () {
    EventBus.off('select-button-option')
  },

  methods: {
    initBot () {
      if (this.isOpen) {
        this.botActive = true
      }

      this.$emit('init')
    },

    botToggle () {
      this.botActive = !this.botActive

      if (this.botActive) {
        this.$emit('open')
      } else {
        // EventBus.$off('select-button-option')
        this.$emit('destroy')
      }
    },

    sendMessage (value) {
      this.$emit('msg-send', value)
    },

    selectOption (value) {
      this.$emit('msg-send', value)
    },
  },
}
</script>

<style lang="scss" src="../assets/scss/_app.scss"></style>
