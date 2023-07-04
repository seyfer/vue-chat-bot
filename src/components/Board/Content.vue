<template>
  <div ref="boardContentRef" class="qkb-board-content">
    <div ref="boardBubblesRef" class="qkb-board-content__bubbles">
      <message-bubble
        v-for="(item, index) in mainData"
        :key="index"
        :message="item"
      ></message-bubble>
      <div v-if="botTyping" class="qkb-board-content__bot-typing">
        <slot name="botTyping">
          <message-typing></message-typing>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, PropType, nextTick } from 'vue';
import MessageBubble from '../MessageBubble/Main.vue'
import MessageTyping from '../MessageBubble/Typing.vue'

export default defineComponent({
  components: {
    MessageBubble,
    MessageTyping,
  },
  props: {
    mainData: {
      type: Array as PropType<Array<any>>,
      required: true,
    },
    botTyping: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const boardContentRef = ref<HTMLElement | null>(null);
    const boardBubblesRef = ref<HTMLElement | null>(null);

    watch(
      () => props.mainData,
      () => {
        nextTick(() => {
          updateScroll();
        });
      },
      { deep: true }
    );

    onMounted(updateScroll);

    function updateScroll() {
      const contentElm = boardContentRef.value;
      const offsetHeight = boardBubblesRef.value?.offsetHeight;

      if (contentElm && offsetHeight) {
        contentElm.scrollTop = offsetHeight;
      }
    }

    return {
      boardContentRef,
      boardBubblesRef,
    }
  },
});
</script>
