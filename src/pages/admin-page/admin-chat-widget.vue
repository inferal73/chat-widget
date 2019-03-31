<template>
  <div class="chat-widget">
    <div class="header" @click="openChat = !openChat">
      Ответьте на воспрос пользователя
    </div>
    <template v-if="openChat">
      <div class="messages" ref="messages">
        <div v-if="loading" class="loading">Загрузка...</div>
        <template v-else>
          <chat-message
            v-for="(msg, key) in messages"
            :key="key"
            :message="msg"
          />
        </template>
      </div>
      <chat-form @submit="onSubmit" />
    </template>
  </div>
</template>

<script>
import ChatWidgetMixin from '@/components/chat-widget/chat-widget.mixin';

export default {
  name: 'ChatWidget',

  mixins: [ChatWidgetMixin],

  props: {
    chatId: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    openChat: true,
    author: 'agent',
  }),

  created() {
    this.chatsRef
      .child(this.chatId)
      .on('value', snapshot => {
        const value = snapshot.val();
        this.messages = value && value.messages;
        this.scrollMessages();
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~@/components/chat-widget/style";
</style>
