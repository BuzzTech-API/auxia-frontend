<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  disabled: Boolean
});

const emit = defineEmits(["click"]);
</script>

<template>
  <div>
    <button class="BtnSalvar"
    :class="{'disabled': disabled}"
    :disabled="disabled" 
    @click="emit('click')"> 
      <p class="texto"> Salvar </p>
    </button>
  </div>
</template>

<style scoped>
.BtnSalvar {
  margin-top: 1.0rem;
  margin-left: auto;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background-color: #9800E0;
  color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 160px;
  height: 45px;
  align-items: center;
}

.BtnSalvar:hover {
  background-color: #AD00FF;
  transition: 300ms;
  transition-delay: 50ms;
}

.BtnSalvar:active {
  background-color: #7000A6;
  transition: 300ms;
  transition-delay: 50ms;
}

.BtnSalvar.disabled {
  background-color: #835C96;
  cursor: not-allowed;
}

.texto {
  font-size: 16px;
  font-weight: bold;
}
</style>
