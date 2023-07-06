<template>
  <div class="osk-board-header">
    <slot name="header">
      <div class="osk-board-header__title">{{ botTitle }}</div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    botTitle: {
      type: String as PropType<string>,

      default: 'Chatbot',
    },
  },
});
</script>
