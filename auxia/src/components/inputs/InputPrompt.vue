<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';
import BtnPrompt from '@/components/buttons/BtnPrompt.vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
  (event: 'click', value: string): void;
}>();

const isButtonDisabled = computed(() => props.modelValue.trim() === '');

const handleClick = () => {
  emit('click', props.modelValue);
};
</script>

<template>
  <div class="prompt">
    <input
      type="text"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      placeholder="Escreva seu Prompt Aqui. Exemplo: 'Gostaria de Saber sobre Alzheimer.'"
    />
    <BtnPrompt :disabled="isButtonDisabled" @click="handleClick"/>
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