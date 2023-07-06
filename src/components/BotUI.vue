<template>
  <div :class="uiClasses" class="osk-bot-ui">
    <transition name="osk-fadeUp">
      <div v-if="botActive" class="osk-board">
        <BoardHeader :bot-title="optionsMain.botTitle" @close-bot="botToggle">
          <template v-slot:header>
            <slot name="header"></slot>
          </template>
        </BoardHeader>
        <BoardContent :bot-typing="botTyping" :main-data="messages" />
        <BoardAction
          :input-disable="inputDisable"
          :input-disable-placeholder="optionsMain.inputDisablePlaceholder"
          :input-placeholder="optionsMain.inputPlaceholder"
          @msg-send="sendMessage"
        />
      </div>
    </transition>
    <div class="osk-bot-bubble">
      <button class="osk-bubble-btn" @click="botToggle">
        <slot name="bubbleButton">
          <transition name="osk-scaleUp">
            <img v-if="!botActive"
                 key="bot-inactive"
                 class="osk-bubble-btn-icon"
                 src="@/assets/icons/bubble.svg"
                 alt="bot-inactive" />
            <img
              v-else
              key="bot-active"
              class="osk-bubble-btn-icon osk-bubble-btn-icon--close"
              src="@/assets/icons/close.svg"
              alt="bot-active" />
          </transition>
        </slot>
      </button>
    </div>

    <AppStyle :options="optionsMain" />

    <div class="osk-preload-image">
      <div v-if="optionsMain.botAvatarImg" class="osk-msg-avatar__img"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue';
import EventBus from '../helpers/event-bus'
import BoardHeader from './Board/Header.vue'
import BoardContent from './Board/Content.vue'
import BoardAction from './Board/Action.vue'
import AppStyle from './AppStyle.vue'
import { Message } from "@/helpers/message";

interface Options {
  botTitle?: string;
  colorScheme?: string;
  textColor?: string;
  bubbleBtnSize?: number;
  animation?: boolean;
  boardContentBg?: string;
  botAvatarSize?: number;
  botAvatarImg?: string;
  msgBubbleBgBot?: string;
  msgBubbleColorBot?: string;
  msgBubbleBgUser?: string;
  msgBubbleColorUser?: string;
  inputPlaceholder?: string;
  inputDisableBg?: string;
  inputDisablePlaceholder?: string;
}

export default defineComponent({
  name: 'VueBotUI',
  components: {
    BoardHeader,
    BoardContent,
    BoardAction,
    AppStyle,
  },
  props: {
    options: {
      type: Object as PropType<Options>,
      default: () => ({}),
    },
    messages: {
      type: Array as PropType<Message[]>,
      default: () => ([]),
    },
    botTyping: {
      type: Boolean,
      default: false,
    },
    inputDisable: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const botActive = ref(props.isOpen);
    const defaultOptions: Options = {
      botTitle: 'Chatbot',
      colorScheme: '#1b53d0',
      textColor: '#fff',
      bubbleBtnSize: 56,
      animation: true,
      boardContentBg: '#fff',
      botAvatarSize: 32,
      botAvatarImg: 'http://placehold.it/200x200',
      msgBubbleBgBot: '#f0f0f0',
      msgBubbleColorBot: '#000',
      msgBubbleBgUser: '#4356e0',
      msgBubbleColorUser: '#fff',
      inputPlaceholder: 'Message',
      inputDisableBg: '#fff',
      inputDisablePlaceholder: undefined,
    };

    const optionsMain = computed(() => ({ ...defaultOptions, ...props.options }));

    const uiClasses = computed(() => {
      const classes = [];

      if (optionsMain.value.animation) {
        classes.push('osk-bot-ui--animate');
      }

      return classes;
    });

    onMounted(() => {
      EventBus.on('select-button-option', selectOption);
      if (props.isOpen) {
        botActive.value = true;
      }
      emit('init');
    });

    onBeforeUnmount(() => {
      EventBus.off('select-button-option');
    });

    const botToggle = () => {
      botActive.value = !botActive.value;

      if (botActive.value) {
        emit('open');
      } else {
        emit('destroy');
      }
    };

    const sendMessage = (value: any) => {
      emit('msg-send', value);
    };

    const selectOption = (value: any) => {
      emit('msg-send', value);
    };

    return { uiClasses, botActive, optionsMain, botToggle, sendMessage };
  },
});
</script>

