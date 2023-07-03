import { defineCustomElement } from 'vue'
import App from '@/App.vue'

// debug
// console.log(App.styles)

const OskChatBot = defineCustomElement(App)

customElements.define('osk-chatbot', OskChatBot)
