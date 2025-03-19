<script setup>
import Button from 'primevue/button';
import { defineProps, defineEmits } from 'vue';

defineProps({
  disabled: Boolean
});

const emit = defineEmits();

</script>

<template>
    <button class="botao"
    :class="{'disabled': disabled}"
    :disabled="disabled"
     @click="emit('click')"
    >
      <i class="pi pi-arrow-right"></i>
    </button>
</template>

<style scoped>
.botao {
  width: 40px;
  height: 40px;
  border-radius: 50%; 
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:  black;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: 0.3s;
}

.botao:hover {
  background-color: #4F4F4F;
}

.botao.disabled {
  background-color: #A0A0A0;
  cursor: not-allowed;
}
</style>