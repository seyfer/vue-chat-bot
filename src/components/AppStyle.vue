<template>
  <div class="osk-bot-style" style="display: none" v-html="style"></div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

interface StyleOptions {
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
      type: Object as PropType<StyleOptions>,
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
<style type="text/css" id="osk-bot-style">
.osk-bubble-btn {
  background-color: ${colorScheme};
  width: ${bubbleBtnSize}px;
  height: ${bubbleBtnSize}px;
}
.osk-bubble-btn-icon {
  fill: ${textColor};
  color: ${textColor};
}
.osk-board {
  /* no error here */
  bottom: ${bubbleBtnSize}px;
}
.osk-board-header {
  background-color: ${colorScheme};
}
.osk-board-header__title {
  color: ${textColor};
}
.osk-board-content {
  background-color: ${boardContentBg};
}
${botAvatarImg
        ? `.osk-msg-avatar {
      width: ${botAvatarSize}px;
      height: ${botAvatarSize}px;
    }
    .osk-msg-avatar__img {
      background-image: url(${botAvatarImg});
    }`
        : ''
      }
.osk-msg-bubble--bot .osk-msg-bubble-component__text {
  color: ${msgBubbleColorBot};
  background-color: ${msgBubbleBgBot};
}
.osk-msg-bubble__typing-indicator span,
.osk-msg-bubble__typing-indicator::before,
.osk-msg-bubble__typing-indicator::after {
  background-color: ${msgBubbleColorBot};
}
.osk-mb-button-options__btn::before {
  background-color: ${msgBubbleBgUser};
}
.osk-msg-bubble--user .osk-msg-bubble-component__text {
  color: ${msgBubbleColorUser};
  background-color: ${msgBubbleBgUser};
}
.osk-mb-button-options__btn {
  color: ${msgBubbleBgUser};
  border-color: ${msgBubbleBgUser};
}
.osk-mb-button-options__btn:hover {
  color: ${msgBubbleColorUser};
  background-color: ${msgBubbleBgUser};
}
.osk-board-action--disabled::before {
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
