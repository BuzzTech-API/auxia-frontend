<script setup lang="ts">
import BoxTextoInicial from '@/components/boxes/BoxTextoInicial.vue';
import InputPrompt from '@/components/inputs/InputPrompt.vue';
import LoadingRespostas from '@/components/LoadingRespostas.vue';
import router from '@/router';
import api from '@/services/api';
import { ref } from 'vue';
import { useAwnserOneStore } from '@/stores/awnserOne';
import { useAwnserTwoStore } from '@/stores/awnserTwo';


const prompt = ref("");
const carregando = ref(false);
const awnserOne = useAwnserOneStore()
const awnserTwo = useAwnserTwoStore()

async function enviarPergunta() {

  carregando.value = true;

  try {
    const request = await api.post("/ai/generate", { prompt: prompt.value });
    awnserOne.ans_prompt = prompt.value
    awnserOne.ans_llm_awnser = request.data.response1
    awnserOne.ans_llm_model = request.data.modelLlm1
    awnserTwo.ans_prompt = prompt.value
    awnserTwo.ans_llm_awnser = request.data.response2
    awnserTwo.ans_llm_model = request.data.modelLlm2

    console.log(request);

    setTimeout(() => {
      carregando.value = false;
      router.push({ name: 'resposta' });
    }, 10);

    prompt.value = "";

  } catch (error) {
    console.error("Erro ao enviar pergunta:", error);
  }
}
</script>

<template>
<div v-if="carregando">
  <div class="container">
    <LoadingRespostas/>
  </div>
</div>

<div v-else>
  <div class="container">

    <div class="box">
      <BoxTextoInicial />
    </div>
    <div class="input">

      <InputPrompt v-model="prompt" @click="enviarPergunta"/>
    </div>

  </div>
</div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  position: relative;
}

.box {
  display: flex;
  justify-content: center;
}

.input {
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
