<template>
  <div class="osk-msg-bubble-component osk-msg-bubble-component--button-options">
    <div v-if="mainData.type === 'text'" class="osk-msg-bubble-component__text">{{ mainData.text }}</div>
    <div v-if="['html', 'button'].includes(mainData.type)"
         class="osk-msg-bubble-component__text"
         v-html="mainData.text"></div>
    <div class="osk-msg-bubble-component__options-wrapper">
      <div
        v-for="(item, index) in mainData.options"
        :key="index"
        :class="{ active: selectedItem?.value === item.value }"
        class="osk-mb-button-options__item"
      >
        <button
          v-if="item.action === 'postback'"
          class="osk-mb-button-options__btn"
          @click="selectOption(item)"
        >
          <span>{{ item.text }}</span>
        </button>
        <a
          v-else
          :href="item.value"
          class="osk-mb-button-options__btn osk-mb-button-options__url"
          target="_blank"
        >
          <span>{{ item.text }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue'
import EventBus from '../../helpers/event-bus'
import { Message, Option } from "@/helpers/message";

export default defineComponent({
  props: {
    mainData: {
      type: Object as PropType<Message>,
      required: true,
    },
  },

  setup() {
    const selectedItem = ref<Option | null>(null)

    const selectOption = (value: Option) => {
      selectedItem.value = value
      EventBus.emit('select-button-option', value)
    }

    return {
      selectedItem,
      selectOption,
    }
  },
})
</script>
