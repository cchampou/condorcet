<template>
  <div>
    <PulseLoader></PulseLoader>
    <slot></slot>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  components: {
    PulseLoader
  }
};
</script>

<style></style>
