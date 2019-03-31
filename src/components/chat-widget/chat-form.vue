<template>
  <form class="chat-form">
    <textarea
      v-model="text"
      autofocus
      rows="3"
      class="textarea"
      @keyup.ctrl.enter="onSubmit"
    ></textarea>
    <button
      :disabled="!text"
      class="button"
      @click="onSubmit"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </button>
  </form>
</template>

<script>
export default {
  name: 'ChatForm',

  data: () => ({
    text: '',
  }),

  methods: {
    onSubmit() {
      if (!this.text) { return; }
      this.$emit('submit', this.text);
      this.text = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import "conts";

*:focus {
  outline: none;
}

.chat-form {
  position: relative;
  display: flex;
  min-height: 60px;
  background: #fff;
  border-top: 1px solid #edeaea;
  margin: 0;

  .textarea {
    border: none;
    display: block;
    width: 100%;
    height: 100%;
    min-height: 50px;
    max-height: 150px;
    padding: 5px 10px;
    resize: vertical;
    font-family: $main-font;
  }

  .button {
    border: none;
    background: none;
    opacity: .8;

    &:hover {
      opacity: 1;
      cursor: pointer;
    }

    &:disabled {
      opacity: .4;
      cursor: default;
    }

    & > svg {
      fill: $main-color;
    }
  }
}
</style>
