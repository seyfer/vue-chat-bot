import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import VueChatBot from '@/App.vue'

// install     "document-register-element": "^1.14.10", vue-custom-element
// Needed to support the custom element in older browsers
import 'document-register-element'

// @ts-ignore
Vue.use(vueCustomElement)

// @ts-ignore
Vue.customElement('osk-chatbot', VueChatBot)

// Create and mount the component to the custom element
// eslint-disable-next-line no-new
// @ts-ignore
new Vue({
  el: 'osk-chatbot',
  // @ts-ignore
  render: h => h(VueChatBot),
})
