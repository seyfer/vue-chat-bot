<template>
  <div :class="bubbleClass" class="osk-msg-bubble">
    <div v-if="message.agent === 'bot'" class="osk-msg-avatar">
      <div class="osk-msg-avatar__img">&nbsp;</div>
    </div>
    <component :is="componentType" v-if="componentType" :main-data="message"></component>
    <div v-if="message.createdAt" class="osk-msg-bubble__time">{{ message.createdAt }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import SingleText from './SingleText.vue'
import ButtonOptions from './ButtonOptions.vue'
import { Message } from "@/helpers/message";

interface MessageWithDate extends Message{
  createdAt: string;
}

export default defineComponent({
  components: {
    SingleText,
    ButtonOptions,
  },
  props: {
    message: {
      type: Object as PropType<MessageWithDate>,
      required: true,
    },
  },
  setup(props) {
    const bubbleClass = computed(() => {
      return props.message.agent === 'bot'
        ? 'osk-msg-bubble--bot'
        : 'osk-msg-bubble--user'
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
