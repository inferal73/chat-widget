import { db } from '@/services/firebase.service';
import ChatMessage from '@/components/chat-widget/chat-message';
import ChatForm from '@/components/chat-widget/chat-form';
import { Message } from './message.model';

export default {
  components: {
    ChatForm,
    ChatMessage,
  },

  data: () => ({
    loading: true,
    chatsRef: db.ref('chats'),
    messages: [],
  }),

  methods: {
    onSubmit(text) {
      this.chatsRef
        .child(`${this.chatId}/messages`)
        .push(new Message({
          author: this.author,
          text,
        }));
    },
    async scrollMessages() {
      await this.$nextTick();
      const $messages = this.$refs.messages;
      $messages && ($messages.scrollTop = $messages.scrollHeight);
    },
  },

  created() {
    this.chatsRef.once('value', () => this.loading = false);
  },
};
