<template>
  <div :class="actionClass" class="qkb-board-action">
    <div class="qkb-board-action__wrapper">
      <div class="qkb-board-action__msg-box">
        <input
          ref="qkbMessageInput"
          v-model="messageText"
          :disabled="inputDisable"
          :placeholder="inputPlaceholder"
          class="qkb-board-action__input"
          type="text"
          @keydown.enter="sendMessage"
        />
        <div
          v-if="inputDisablePlaceholder && inputDisable"
          class="qkb-board-action__disable-text"
        >
          <span>{{ inputDisablePlaceholder }}</span>
        </div>
      </div>
      <div class="qkb-board-action__extra">
        <slot name="actions"></slot>
        <button class="qkb-action-item qkb-action-item--send" @click="sendMessage">
          <slot name="sendButton">
            <img class="qkb-action-icon qkb-action-icon--send" src="@/assets/icons/send.svg" />
          </slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, PropType } from 'vue';

export default defineComponent({
  props: {
    inputPlaceholder: {
      type: String as PropType<string>,
    },
    inputDisablePlaceholder: {
      type: String as PropType<string>,
    },
    inputDisable: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { emit }) {
    const messageText = ref<string | null>(null);
    // Declare a ref to the input element
    const qkbMessageInput = ref<HTMLElement | null>(null);

    const actionClass = computed(() => {
      const actionClasses = [];

      if (props.inputDisable) {
        actionClasses.push('qkb-board-action--disabled');
      }

      if (messageText.value) {
        actionClasses.push('qkb-board-aciton--typing');
      }

      // TODO: sending

      return actionClasses;
    });

    onMounted(() => {
      qkbMessageInput.value?.focus();
    });

    const sendMessage = () => {
      if (messageText.value) {
        emit('msg-send', { text: messageText.value });
        messageText.value = null;
      }
    };

    return {
      qkbMessageInput,
      messageText,
      actionClass,
      sendMessage,
    };
  },
});
</script>
