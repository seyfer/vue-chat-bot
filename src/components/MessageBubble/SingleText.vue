<template>
  <div class="qkb-msg-bubble-component qkb-msg-bubble-component--single-text">
    <div v-if="mainData.type === 'text'" class="qkb-msg-bubble-component__text">{{ mainData.text }}</div>
    <div v-if="['html', 'button'].includes(mainData.type)" class="qkb-msg-bubble-component__text"
         v-html="mainData.text"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface MainData {
  type: string;
  text: string;
}

export default defineComponent({
  props: {
    mainData: {
      type: Object as PropType<MainData>,
      required: true,
    },
  },
});
</script>
