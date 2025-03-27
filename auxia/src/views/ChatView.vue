<script setup lang="ts">
import BoxTextoInicial from '@/components/boxes/BoxTextoInicial.vue';
import InputPrompt from '@/components/inputs/InputPrompt.vue'; 
import BoxRespostaIA from '@/components/BoxRespostaIA.vue'; 
import LoadingRespostas from '@/components/LoadingRespostas.vue';
import router from '@/router';
import api from '@/services/api';
import { ref } from 'vue';


const prompt = ref("");
const carregando = ref(false);

async function enviarPergunta() {
 
  carregando.value = true;

  try {
    const request = await api.post("/ai/generate", { prompt: prompt.value });
    console.log(request);
    
    setTimeout(() => {
      carregando.value = false;
      router.push({ name: 'lalala' });
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
      <BoxRespostaIA/>
      <!-- <BoxTextoInicial />  -->
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
