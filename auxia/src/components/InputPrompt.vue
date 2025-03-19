<script setup lang="ts">
import { ref, computed } from 'vue';
import BtnPrompt from './BtnPrompt.vue';
import api from '@/services/api';

const prompt = ref('');
const isButtonDisabled = computed(() => prompt.value.trim() === '');

async function enviarPergunta(){

  try {
    
    const request = await api.post("/ai/generate", {prompt: prompt.value})
    // console.log(prompt)
    prompt.value = ""; 
    
  } catch (error) {
    console.error("Erro ao enviar pergunta:", error);
  }

}


</script>

<template>
    <div class="prompt">
       
        <input type="text" 
        v-model="prompt"
        placeholder="Escreva seu Prompt Aqui. Exemplo: “Gostaria de Saber sobre Alzheimer.”  "/>
       
        <BtnPrompt :disabled="isButtonDisabled" @click="enviarPergunta"/>
    </div>
</template>


<style scoped>
.prompt {
  display: flex;
  align-items: center;
  gap: 10px; 
  width: 100%; 
  max-width: 70%; 
  border-radius: 15px;
  background-color: #D9D9D9;
  padding: 8px; 
  
}

input {
  flex: 1; /* Faz o input crescer dentro da div */
  width: 100%; /* Garante que ele respeite os limites */
  min-width: 0; /* Impede que ele force a div a crescer */
  padding: 5px;
  font-size: 16px;
  border: none;
  background: transparent;
  outline: none;
  color: black;
}

</style>