<template>
    <div class="boxResposta">

        <h2> Resposta {{ llm }}</h2>

    <div v-html="respostaHTML" />

    </div>

</template>

<style scoped>
.boxResposta{
    width: 32vw;
    max-width: 32vw;
    padding-top: 1px;
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
    background-color: #D9D9D9;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}
</style>

<script setup lang="ts">

const props = defineProps<{
    llm: string;
    resposta: string;
}>();

import { marked } from "marked";
const respostaHTML = marked.parse(props.resposta);
</script>
