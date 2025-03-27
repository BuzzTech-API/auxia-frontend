<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  disabled: Boolean
});

const emit = defineEmits(["click"]);
</script>

<template>
  <button 
    class="confirm-button" 
    :class="{'disabled': disabled}"
    :disabled="disabled"
    @click="emit('click')"
  >
    Confirmar Avaliação
  </button>
</template>

<style scoped>
.confirm-button {
  margin-top: 1.5rem;
  margin-left: auto;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #7B7B7B;
}

.confirm-button.disabled {
  background-color: #A0A0A0;
  cursor: not-allowed;
}
</style>
