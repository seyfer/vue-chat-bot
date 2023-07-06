<template>
  <div id="app">
    <img alt="Vue Bot UI" src="@/assets/logo.png" />
    <VueChatBot
      :bot-typing="botTyping"
      :input-disable="inputDisable"
      :is-open="false"
      :messages="messageData"
      :options="botOptions"
      @init="botStart"
      @msg-send="msgSend"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// @ts-ignore
import BotIcon from './assets/icons/bot.png';
import { VueChatBot } from './vue-chat-bot';
import { Message, messageService } from './helpers/message';

export default defineComponent({
  components: {
    VueChatBot,
  },
  setup() {
    const messageData = ref<Message[]>([]);
    const botTyping = ref(false);
    const inputDisable = ref(false);
    const botOptions = ref({
      botAvatarImg: BotIcon,
      boardContentBg: '#f4f4f4',
      msgBubbleBgBot: '#fff',
      inputPlaceholder: 'Type here...',
      inputDisableBg: '#fff',
      inputDisablePlaceholder: 'Hit the buttons above to respond',
    });

    const botStart = () => {
      botTyping.value = true;
      setTimeout(() => {
        botTyping.value = false;
        messageData.value.push({
          agent: 'bot',
          type: 'text',
          text: 'Hello',
        });
      }, 1000);
    };

    const msgSend = (value: Message) => {
      messageData.value.push({
        agent: 'user',
        type: 'text',
        text: value.text,
      });

      getResponse();
    };

    const getResponse = () => {
      botTyping.value = true;

      messageService.createMessage().then((response: Message) => {
        const replyMessage: Message = {
          ...response,
          agent: 'bot',
        };

        inputDisable.value = !!response.disableInput;
        messageData.value.push(replyMessage);

        botTyping.value = false;
      });
    };

    return {
      messageData,
      botTyping,
      inputDisable,
      botOptions,
      botStart,
      msgSend,
    };
  },
});
</script>

<style lang="scss" src="@/assets/scss/_app.scss"></style>
