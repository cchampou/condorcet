<template>
  <div class="w-1/2 px-6 py-4 rounded overflow-hidden shadow bg-white text-teal-900">
    {{ answer.value }}
  </div>
</template>

<script>
import { ElementMixin } from "vue-slicksort";

export default {
  mixins: [ElementMixin],
  props: { answer: { type: Object } }
};
</script>

<style></style>
