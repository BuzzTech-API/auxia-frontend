<script setup lang="ts">
import BoxTextoInicial from '@/components/boxes/BoxTextoInicial.vue';
import InputPrompt from '@/components/inputs/InputPrompt.vue';
import LoadingRespostas from '@/components/LoadingRespostas.vue';
import router from '@/router';
import api from '@/services/api';
import { ref } from 'vue';
import { useAwnserOneStore } from '@/stores/awnserOne';
import { useAwnserTwoStore } from '@/stores/awnserTwo';
import ModalRespostaBackErro from '@/components/ModalRespostaBackErro.vue';
import BtnRecarregar from '@/components/buttons/BtnRecarregar.vue';

const prompt = ref("");
const carregando = ref(false);
const timeout = ref(false);
const awnserOne = useAwnserOneStore()
const awnserTwo = useAwnserTwoStore()

async function enviarPergunta() {

  carregando.value = true;

  try {
    const request = await api.post("/ai/generate", { prompt: prompt.value }, { timeout: 20000 });
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
    },10);

    prompt.value = "";

  } catch (error) {
    console.error("Erro ao enviar pergunta:", error);
    timeout.value= true;

  }
}

// testanto modal: 
// const isModalOpen = ref(false);

// const openModal = () => {
//   console.log("Opening Modal"); // Debug 
//   isModalOpen.value = true;
// };

// const closeModal = () => {
//   console.log("Closing Modal"); // Debug 
//   isModalOpen.value = false;
// };

</script>

<template>
<div v-if="carregando && !timeout">
  <div class="container">
    <LoadingRespostas/>
  </div>
</div>
<div v-else-if="carregando && timeout" class="aviso">
  <div class="avisoConteudo">
    <h3>Erro ao enviar sua resposta tente Novamente</h3>
    <BtnRecarregar @click="enviarPergunta"/>
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

    <!-- <div>
    <button @click="openModal">Abrir Modal</button>
    
    <ModalRespostaBackErro
      :open="isModalOpen"
      message="Ocorreu um erro."
      icon=""
      @close="closeModal"
    />
  </div> -->

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

.aviso {
  display: flex;
  flex-direction: column;
  justify-content: center;  
  align-items: center;      
  height: 100vh;            
  position: absolute;       
  top: 0;
  left: 0;
  width: 100%;             
  background-color: #ffffff; 
}

.avisoConteudo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; 
  padding: 20px;       
  background-color: #d9d9d9; 
  border-radius: 8px;   
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}
</style>
