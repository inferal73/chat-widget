<template>
  <div class="chat-message">
    <div class="message-author" :class="`-${message.author}`">
      <span class="name">{{ message.author === 'agent' ? 'Агент' : 'Вы' }}</span>
      <span class="time">в {{ message.time | unixToTime }}</span>
    </div>
    <div class="text">{{ message.text }}</div>
  </div>
</template>

<script>
const unixToTime = unix => {
  const date = new Date(unix);
  const toFullNum = num => (num < 10 ? `0${num}` : num);
  return `${toFullNum(date.getHours())}:${toFullNum(date.getMinutes())}`;
};

export default {
  name: 'ChatMessage',

  filters: {
    unixToTime,
  },

  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-message {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  background: #f1f0f0;
  padding: 7px 5px;
  border-radius: 10px;

  .text {
    margin: 5px;
  }
}

.message-author {
  font-size: 14px;

  .name {
    padding: 2px 8px;
    border-radius: 15px;
    color: #fff;
    margin-right: 7px;
  }

  .time {
    color: #bdbaba;
    font-size: 12px;
  }

  &.-user .name {
    background: rgba(230, 0, 0, 0.58);
  }

  &.-agent .name {
    background: rgba(0, 50, 230, 0.58);
  }
}
</style>
