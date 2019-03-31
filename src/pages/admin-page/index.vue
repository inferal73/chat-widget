<template>
  <div class="admin-page">
    <div class="chat-list">
      <div class="item">
        <span>№</span>
        <span>ID</span>
        <span>Кол-во сообщений</span>
      </div>
      <div v-if="loading" class="loading">Загрузка...</div>
      <template v-else>
        <router-link
          v-for="(chat, key, index) in chats"
          :key="key"
          :to="{ name: 'AdminPage', params: { id: key } }"
          tag="div"
          class="item"
        >
          <span>{{ index + 1}}</span>
          <span>{{ key }}</span>
          <span>{{ Object.keys(chat.messages).length }}</span>
        </router-link>
      </template>
    </div>
    <admin-chat-widget v-if="chatId" :key="chatId" :chat-id="chatId" />
  </div>
</template>

<script>
import { db } from '@/services/firebase.service';
import AdminChatWidget from './admin-chat-widget';

export default {
  name: 'AdminPage',

  components: { AdminChatWidget },

  data: () => ({
    loading: true,
    chatsRef: db.ref('chats'),
    chats: [],
  }),

  computed: {
    chatId() {
      return this.$route.params.id;
    },
  },

  created() {
    this.chatsRef.once('value', () => this.loading = false);
    this.chatsRef.on('value', snapshot => {
      this.chats = snapshot.val();
    });
  },
};
</script>

<style lang="scss" scoped>
.admin-page {
  background: #f9f9f9;
  overflow: hidden;
}

.chat-list {
  width: 40vw;
  height: 100vh;
  box-shadow: 0 0 10px #6f79b0;
  margin: auto;
  background: #fff;
  overflow: auto;

  .loading {
    text-align: center;
    margin-top: 40%;
  }

  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
    height: 50px;
    color: #3c415d;
    font-size: 14px;
    cursor: pointer;

    span {
      text-align: center;
      width: 100%;
      line-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:first-child {
      color: rgba(62, 68, 100, 0.61);
    }
  }
}
</style>
