<template>
  <div :class="bubbleClass" class="qkb-msg-bubble">
    <div v-if="message.agent === 'bot'" class="qkb-msg-avatar">
      <div class="qkb-msg-avatar__img">&nbsp;</div>
    </div>
    <component :is="componentType" v-if="componentType" :main-data="message"></component>
    <div v-if="message.createdAt" class="qkb-msg-bubble__time">{{ message.createdAt }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import SingleText from './SingleText.vue'
import ButtonOptions from './ButtonOptions.vue'

interface Message {
  agent: string;
  createdAt: string;
  type: string;
}

export default defineComponent({
  components: {
    SingleText,
    ButtonOptions,
  },
  props: {
    message: {
      type: Object as PropType<Message>,
      required: true,
    },
  },
  setup(props) {
    const bubbleClass = computed(() => {
      return props.message.agent === 'bot'
        ? 'qkb-msg-bubble--bot'
        : 'qkb-msg-bubble--user'
    });

    const componentType = computed(() => {
      let type = ''

      switch (props.message.type) {
        case 'button':
          type = 'ButtonOptions'
          break
        default:
          type = 'SingleText'
      }

      return type
    });

    return { bubbleClass, componentType };
  },
})
</script>
