<template>
  <div class="qkb-msg-bubble-component qkb-msg-bubble-component--button-options">
    <div v-if="mainData.type === 'text'" class="qkb-msg-bubble-component__text">{{ mainData.text }}</div>
    <div v-if="['html', 'button'].includes(mainData.type)"
         class="qkb-msg-bubble-component__text"
         v-html="mainData.text"></div>
    <div class="qkb-msg-bubble-component__options-wrapper">
      <div
        v-for="(item, index) in mainData.options"
        :key="index"
        :class="{ active: selectedItem === item.value }"
        class="qkb-mb-button-options__item"
      >
        <button
          v-if="item.action === 'postback'"
          class="qkb-mb-button-options__btn"
          @click="selectOption(item)"
        >
          <span>{{ item.text }}</span>
        </button>
        <a
          v-else
          :href="item.value"
          class="qkb-mb-button-options__btn qkb-mb-button-options__url"
          target="_blank"
        >
          <span>{{ item.text }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../../helpers/event-bus'

export default {
  props: {
    mainData: {
      type: Object,
    },
  },

  data () {
    return {
      selectedItem: null,
    }
  },

  methods: {
    selectOption (value) {
      this.selectedItem = value
      EventBus.emit('select-button-option', value)
    },
  },
}
</script>
