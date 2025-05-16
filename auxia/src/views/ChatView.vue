<script setup lang="ts">
import BoxTextoInicial from '@/components/boxes/BoxTextoInicial.vue';
import InputPrompt from '@/components/inputs/InputPrompt.vue';
import LoadingRespostas from '@/components/LoadingRespostas.vue';
import router from '@/router';
import api from '@/services/api';
import { ref } from 'vue';
import { useAwnserOneStore } from '@/stores/awnserOne';
import { useAwnserTwoStore } from '@/stores/awnserTwo';
import BtnRecarregar from '@/components/buttons/BtnRecarregar.vue';
import { useToast } from 'primevue';
import Toast from 'primevue/toast';
import MenuUser from '@/components/menu/MenuUser.vue';

const prompt = ref("");
const carregando = ref(false);
const timeout = ref(false);
const awnserOne = useAwnserOneStore()
const awnserTwo = useAwnserTwoStore()
const toast = useToast()

async function enviarPergunta() {

  carregando.value = true;

  try {
    const request = await api.post("/ai/generate", { prompt: prompt.value }, { timeout: 30000 });
    awnserOne.ans_prompt = prompt.value
    awnserOne.ans_llm_awnser = request.data.response1
    awnserOne.ans_llm_model = request.data.modelLlm1
    awnserTwo.ans_prompt = prompt.value
    awnserTwo.ans_llm_awnser = request.data.response2
    awnserTwo.ans_llm_model = request.data.modelLlm2

    toast.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Resposta gerada com sucesso!',
      life: 3000
    })

    setTimeout(() => {
      carregando.value = false;
      router.push({ name: 'resposta' });
    }, 3000);

    prompt.value = "";

  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Falha!',
      detail: 'Falha no envio da pergunta!',
      life: 3000
    })
    console.error("Erro ao enviar pergunta:", error);
    timeout.value = true;

  }
}

</script>

<template>
  <Toast position="top-center" />
  <div v-if="carregando && !timeout">
    <div class="container">
      <LoadingRespostas />
    </div>
  </div>
  <div v-else-if="carregando && timeout" class="aviso">
    <div class="avisoConteudo">
      <h3>Erro ao enviar sua resposta tente Novamente</h3>
      <BtnRecarregar @click="enviarPergunta" />
    </div>
  </div>

  <div v-else>
    <div class="container">

      <div class="header">
        <MenuUser />
      </div>
      <div class="box">
        <BoxTextoInicial />
      </div>
      <div class="input">
        <InputPrompt v-model="prompt" @click="enviarPergunta" />
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

.header {
  width: 100%;
  padding-left: 4rem;
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
