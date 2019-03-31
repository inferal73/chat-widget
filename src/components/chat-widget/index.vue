<template>
  <div class="chat-widget">
    <div class="header" @click="openToggle">
      Задайте вопрос агенту поддержки
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
import Storage from '@/services/storage.service';

export default {
  name: 'ChatWidget',

  mixins: [ChatWidgetMixin],

  data: () => ({
    openChat: false,
    chatId: Storage.getItem('chatId'),
    author: 'user',
    timer: null,
  }),

  methods: {
    openToggle() {
      this.openChat = !this.openChat;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
  },

  created() {
    if (!this.chatId) {
      this.chatId = this.chatsRef.push().key;
      Storage.setItem('chatId', this.chatId);
    }
    this.chatsRef
      .child(this.chatId)
      .on('value', snapshot => {
        const value = snapshot.val();
        this.messages = value && value.messages;
        this.scrollMessages();
      });
  },

  mounted() {
    !this.openChat && (this.timer = setTimeout(() => {
      this.openChat = true;
      this.scrollMessages();
    }, 5000));
  },
};
</script>

<style lang="scss" scoped>
@import "style";
</style>
