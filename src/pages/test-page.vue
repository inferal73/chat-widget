<template>
  <div>
    test page
    <chat-widget />
  </div>
</template>

<script>
import ChatWidget from '@/components/chat-widget/index';

export default {
  name: 'test-page',

  components: { ChatWidget },
};
</script>
