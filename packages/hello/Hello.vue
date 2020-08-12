<template>
  <div class="lfn-hello">
    <p class="lfn-hello__message">hello {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'lfn-hello',
  props: {
    message: {
      type: String,
      default: ''
    }
  }
};
</script>
