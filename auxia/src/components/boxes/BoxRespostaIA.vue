<template>
  <div class="boxResposta">

    <div v-html="respostaHTML" />

  </div>

</template>

<style scoped>
.boxResposta {
  width: 32vw;
  max-width: 32vw;
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 35px;
  padding-bottom: 25px;
  height: 74vh;
  max-height: 74vh;
  overflow-y: auto;
  overflow-x: hidden;
  justify-items: center;
  align-items: center;
  border-radius: 20px;
  background-color: #585858;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  color: white;
}
</style>

<script setup lang="ts">

const props = defineProps<{
  llm: number;
  resposta: string;
}>();

import { marked } from "marked";
const respostaHTML = marked.parse(props.resposta);
</script>
