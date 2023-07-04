<template>
  <div class="qkb-bot-style" style="display: none" v-html="style"></div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

interface Options {
  colorScheme?: string;
  textColor?: string;
  boardContentBg?: string;
  bubbleBtnSize?: number;
  botAvatarImg?: string;
  botAvatarSize?: number;
  inputDisableBg?: string;
  msgBubbleBgBot?: string;
  msgBubbleColorBot?: string;
  msgBubbleBgUser?: string;
  msgBubbleColorUser?: string;
}

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<Options>,
      default: () => ({}),
    },
  },
  setup(props) {
    const style = computed(() => {
      if (!props.options) {
        return '';
      }

      const {
        colorScheme,
        textColor,
        boardContentBg,
        bubbleBtnSize,
        botAvatarImg,
        botAvatarSize,
        inputDisableBg,
        msgBubbleBgBot,
        msgBubbleColorBot,
        msgBubbleBgUser,
        msgBubbleColorUser,
      } = props.options;

      const styles = `
<style type="text/css" id="qkb-bot-style">
.qkb-bubble-btn {
  background-color: ${colorScheme};
  width: ${bubbleBtnSize}px;
  height: ${bubbleBtnSize}px;
}
.qkb-bubble-btn-icon {
  fill: ${textColor};
  color: ${textColor};
}
.qkb-board {
  /* no error here */
  bottom: ${bubbleBtnSize}px;
}
.qkb-board-header {
  background-color: ${colorScheme};
}
.qkb-board-header__title {
  color: ${textColor};
}
.qkb-board-content {
  background-color: ${boardContentBg};
}
${botAvatarImg
        ? `.qkb-msg-avatar {
      width: ${botAvatarSize}px;
      height: ${botAvatarSize}px;
    }
    .qkb-msg-avatar__img {
      background-image: url(${botAvatarImg});
    }`
        : ''
      }
.qkb-msg-bubble--bot .qkb-msg-bubble-component__text {
  color: ${msgBubbleColorBot};
  background-color: ${msgBubbleBgBot};
}
.qkb-msg-bubble__typing-indicator span,
.qkb-msg-bubble__typing-indicator::before,
.qkb-msg-bubble__typing-indicator::after {
  background-color: ${msgBubbleColorBot};
}
.qkb-mb-button-options__btn::before {
  background-color: ${msgBubbleBgUser};
}
.qkb-msg-bubble--user .qkb-msg-bubble-component__text {
  color: ${msgBubbleColorUser};
  background-color: ${msgBubbleBgUser};
}
.qkb-mb-button-options__btn {
  color: ${msgBubbleBgUser};
  border-color: ${msgBubbleBgUser};
}
.qkb-mb-button-options__btn:hover {
  color: ${msgBubbleColorUser};
  background-color: ${msgBubbleBgUser};
}
.qkb-board-action--disabled::before {
  background-color: ${inputDisableBg};
}
</style>
      `;
      return styles;
    });

    return { style };
  },
});
</script>
