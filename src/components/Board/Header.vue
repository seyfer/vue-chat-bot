<template>
  <div class="qkb-board-header">
    <slot name="header">
      <div class="qkb-board-header__title">{{ botTitle }}</div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    botTitle: {
      type: String,
      default: 'Chatbot'
    }
  }
}
</script>
