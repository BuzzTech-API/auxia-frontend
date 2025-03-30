<template>
  <div class="container" v-html="respostaHTML">
      </div>
</template>


<script setup lang="ts">
import { marked } from "marked";
const props = defineProps<{resposta: string}>();
const respostaHTML = marked.parse(props.resposta);

</script>

<style scoped>
.container{
  width: 36.5rem;
  height: 40rem;
  background-color: #D9D9D9;
  padding: 1.5rem;
  overflow-y: auto;
}
.text{
  font-size: 1.25rem;
  font-family: sans-serif;
}
</style>
