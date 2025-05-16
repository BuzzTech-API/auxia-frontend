<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { computed, defineProps, ref } from 'vue';

const props = defineProps<{
  label: string;
  modelValue: string;
  tipoInput: string;
  idInput: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const mostrarSenha = ref(false);

const tipoVisivel = computed(() => {
  return props.tipoInput === 'password'
    ? (mostrarSenha.value ? 'text' : 'password')
    : props.tipoInput;
});

const iconeSenha = computed(() =>
  mostrarSenha.value ? 'pi pi-eye' : 'pi pi-eye-slash'
);

const tocado = ref(false); // indica se o campo já foi tocado

const campoInvalido = computed(() => {
  return tocado.value && props.modelValue.trim() === '';
});
</script>

<template>
  <div class="container">
    <label :for="idInput">{{ label }}:</label>
    

    <div class="input">
      <InputText
        :id="idInput"
        :value="modelValue"
        :type="tipoVisivel"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="{ 'input-error': campoInvalido }"
        @blur="tocado = true"
      />

      <button
        v-if="tipoInput === 'password'"
        type="button"
        @click="mostrarSenha = !mostrarSenha"
        class="btn-senha"
      >
        <i :class="iconeSenha"></i>
      </button>
    </div>
     
  </div>
  <small v-if="campoInvalido" class="mensagem">Campo obrigatório</small>
 
</template>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    width: 95%;
    gap: 0.75rem;
    
    
}

label{
  color: white;
  font-weight: bold;
}

.input {
  position: relative;
  
}

.input input {
  width: 100%;
  padding-right: 2.5rem; 
  box-sizing: border-box;
  background-color: #DFDFDF;
}

.mensagem {
  color: red;
  font-size: 0.75rem;
  margin-left: 0.25rem;
  margin-top: 0.2rem;
}

.btn-senha {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
}

.btn-senha:hover {
  color: #374151;
}
</style>
