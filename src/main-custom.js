import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
// import VueChatBot from '@/components/BotUI.vue'
import VueChatBot from '@/App.vue'

// Needed to support the custom element in older browsers
import 'document-register-element'

Vue.use(vueCustomElement)

Vue.component('osk-chatbot', VueChatBot)

// Create and mount the component to the custom element
// eslint-disable-next-line no-new
new Vue({
  el: 'osk-chatbot',
  render: h => h(VueChatBot)
})
