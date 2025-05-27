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
import StepperLine from '@/components/menu/StepperLine.vue';

const prompt = ref("");
const carregando = ref(false);
const timeout = ref(false);
const awnserOne = useAwnserOneStore()
const awnserTwo = useAwnserTwoStore()
const toast = useToast()

  awnserOne.$reset()
  awnserTwo.$reset()

async function enviarPergunta() {

  awnserOne.$reset()
  awnserTwo.$reset()
  carregando.value = true;

  try {
    const request = await api.post("/ai/generatenorag", { prompt: prompt.value }, { timeout: 40000 });
    awnserOne.ans_prompt = prompt.value
    awnserOne.ans_llm_answer = request.data.response1
    awnserOne.ans_llm_model = request.data.modelLlm1
    awnserTwo.ans_prompt = prompt.value
    awnserTwo.ans_llm_answer = request.data.response2
    awnserTwo.ans_llm_model = request.data.modelLlm2



    toast.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Respostas gerada com sucesso!',
      life: 3000
    })
    setTimeout(() => {
      carregando.value = false;
      router.push({ name: 'Resposta 1' });
    }, 3000);

    prompt.value = "";

  } catch (error) {
    console.error("Erro ao enviar pergunta:", error);
    toast.add({
      severity: 'error',
      summary: 'Falha!',
      detail: 'Falha no envio da pergunta!',
      life: 3000
    })
    timeout.value = true;

  }
}

</script>

<template>
  <div class="flex flex-col w-full">
    <MenuUser />
    <Toast position="top-center" />
    <div v-if="carregando && !timeout">
      <div class="container1">
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
      <div class="container1">

        <div>
          <StepperLine :currentStep="1"/>
        </div>
        <div class="box">
          <BoxTextoInicial />
        </div>
        <div class="input">
          <InputPrompt v-model="prompt" @click="enviarPergunta" />
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>
.container1 {
  display: flex;
  flex-direction: column;
  gap: 125px;
  padding-top: 20px;
  align-items: center;
  width: 100%;
  height: 55rem;
}


.box {
  display: flex;
  width: 100%;
  justify-content: center;
}

.input {
  display: flex;
  padding-bottom: 20px;
  width: 100%;
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
