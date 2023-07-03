import { defineCustomElement } from 'vue'
import App from '@/App.vue'

const OskChatBot = defineCustomElement(App)

customElements.define('osk-chatbot', OskChatBot)

// // Create Vue 3 app
// const app = createApp({
//   render: () => h(App),
// });
//
// // Mount Vue 3 app
// app.mount('osk-chatbot');
