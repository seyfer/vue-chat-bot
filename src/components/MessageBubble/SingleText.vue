<template>
  <div class="osk-msg-bubble-component osk-msg-bubble-component--single-text">
    <div v-if="mainData.type === 'text'" class="osk-msg-bubble-component__text">{{ mainData.text }}</div>
    <div v-if="['html', 'button'].includes(mainData.type)" class="osk-msg-bubble-component__text"
         v-html="mainData.text"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Message } from "@/helpers/message";

export default defineComponent({
  props: {
    mainData: {
      type: Object as PropType<Message>,
      required: true,
    },
  },
});
</script>
