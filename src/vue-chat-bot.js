import VueChatBot from './components/BotUI.vue'

const Plugin = {
  install (Vue, options) {
    Vue.component('VueChatBot', VueChatBot)

    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(Plugin)
    }

    // Vue.customElement('chat-bot', VueChatBot)
  }
}

export default Plugin
export { VueChatBot }
