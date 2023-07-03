<template>
  <div class="qkb-msg-bubble-component qkb-msg-bubble-component--single-text">
    <div class="qkb-msg-bubble-component__text" v-if="mainData.type === 'text'">{{ mainData.text }}</div>
    <div class="qkb-msg-bubble-component__text" v-if="['html', 'button'].includes(mainData.type)" v-html="mainData.text"></div>
  </div>
</template>

<script>
export default {
  props: {
    mainData: {
      type: Object
    }
  }
}
</script>
