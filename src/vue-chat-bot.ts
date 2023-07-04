import VueChatBot from './components/BotUI.vue'

// @ts-ignore
const Plugin = {
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  install (Vue, options) {
    Vue.component('VueChatBot', VueChatBot)

    // @ts-ignore
    if (typeof window !== 'undefined' && window.Vue) {
      // @ts-ignore
      window.Vue.use(Plugin)
    }
  },
}

export default Plugin
export { VueChatBot }
