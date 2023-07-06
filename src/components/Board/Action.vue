<template>
  <div :class="actionClass" class="osk-board-action">
    <div class="osk-board-action__wrapper">
      <div class="osk-board-action__msg-box">
        <input
          ref="oskMessageInput"
          v-model="messageText"
          :disabled="inputDisable"
          :placeholder="inputPlaceholder"
          class="osk-board-action__input"
          type="text"
          @keydown.enter="sendMessage"
        />
        <div
          v-if="inputDisablePlaceholder && inputDisable"
          class="osk-board-action__disable-text"
        >
          <span>{{ inputDisablePlaceholder }}</span>
        </div>
      </div>
      <div class="osk-board-action__extra">
        <slot name="actions"></slot>
        <button class="osk-action-item osk-action-item--send" @click="sendMessage">
          <slot name="sendButton">
            <img class="osk-action-icon osk-action-icon--send" src="@/assets/icons/send.svg"  alt="icon-send"/>
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
    const oskMessageInput = ref<HTMLElement | null>(null);

    const actionClass = computed(() => {
      const actionClasses = [];

      if (props.inputDisable) {
        actionClasses.push('osk-board-action--disabled');
      }

      if (messageText.value) {
        actionClasses.push('osk-board-aciton--typing');
      }

      // TODO: sending

      return actionClasses;
    });

    onMounted(() => {
      oskMessageInput.value?.focus();
    });

    const sendMessage = () => {
      if (messageText.value) {
        emit('msg-send', { text: messageText.value });
        messageText.value = null;
      }
    };

    return {
      oskMessageInput,
      messageText,
      actionClass,
      sendMessage,
    };
  },
});
</script>
