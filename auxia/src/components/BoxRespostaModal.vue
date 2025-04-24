<template>
  <div class="container">
    <div v-html="respostaHTML" />

  </div>
</template>


<script setup lang="ts">
const props = defineProps<{resposta: string}>();

import { marked } from "marked";
const respostaHTML = marked.parse(props.resposta);
</script>

<style scoped>
.container{
  width: 36.5rem;
  height: 28rem;
  background-color: #ffffff;
  padding: 1.5rem;
  overflow-y: auto;
}
.text{
  font-size: 1.25rem;
  font-family: sans-serif;
}
</style>
