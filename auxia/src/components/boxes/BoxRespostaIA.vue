<template>
  <div class="boxResposta  prose prose-invert" v-html="respostaHTML">


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
/* listas */
.boxResposta ::v-deep ul,
.boxResposta ::v-deep ol {
  margin: 0.5em 0 !important;
  padding-inline-start: 1.25rem !important;
}
.boxResposta ::v-deep ul {
  list-style-type: disc !important;
}
.boxResposta ::v-deep ol {
  list-style-type: decimal !important;
}

/* parágrafos e cabeçalhos */
.boxResposta ::v-deep p {
  margin: 0.75em 0 !important;
  line-height: 1.6 !important;
}
.boxResposta ::v-deep h1,
.boxResposta ::v-deep h2,
.boxResposta ::v-deep h3,
.boxResposta ::v-deep h4,
.boxResposta ::v-deep h5,
.boxResposta ::v-deep h6 {
  margin: 1em 0 0.5em !important;
  font-weight: bold !important;
  line-height: 1.3 !important;
}

/* ênfase e strong */
.boxResposta ::v-deep em {
  font-style: italic !important;
}
.boxResposta ::v-deep strong {
  font-weight: 700 !important;
}

/* código inline e blocos de código */
.boxResposta ::v-deep code {
  background-color: #2d2d2d !important;
  color: #f8f8f2 !important;
  padding: 0.2em 0.4em !important;
  border-radius: 4px !important;
  font-family: monospace !important;
  font-size: 0.9em !important;
}
.boxResposta ::v-deep pre {
  background-color: #2d2d2d !important;
  color: #f8f8f2 !important;
  padding: 1em !important;
  overflow: auto !important;
  border-radius: 4px !important;
  margin: 1em 0 !important;
}

/* links */
.boxResposta ::v-deep a {
  color: #4ea1d3 !important;
  text-decoration: underline !important;
}

/* blocos de citação */
.boxResposta ::v-deep blockquote {
  border-left: 4px solid #e0d500 !important;
  padding-left: 1em !important;
  color: #ccc !important;
  margin: 1em 0 !important;
}

</style>

<script setup lang="ts">

const props = defineProps<{
  llm: number;
  resposta: string;
}>();

import { marked } from "marked";
import { computed } from "vue";
const respostaHTML = computed(() => marked.parse(props.resposta))
</script>
