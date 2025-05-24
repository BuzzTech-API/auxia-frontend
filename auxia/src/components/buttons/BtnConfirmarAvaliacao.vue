<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  disabled: Boolean,
  hasArrow: Boolean
});

const emit = defineEmits(["click"]);

</script>

<template>
  <div>
    <button class="confirm-button"
    :class="{'disabled': disabled}"
    :disabled="disabled"
     @click="emit('click')">
      <p class="texto"> Confirmar Avaliação </p>
      <i v-if="hasArrow" class="pi pi-arrow-right"></i>
    </button>
  </div>
</template>

<style scoped>
.confirm-button {
  background-color: #9800E0;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  width: 160px;
  height: 45px;
  align-items: center;
}

.confirm-button:hover {
  background-color: #AD00FF;
  transition: 300ms;
  transition-delay: 50ms;
}

.confirm-button.disabled {
  background-color: #835C96;
  cursor: not-allowed;
}

.confirm-button.active {
background-color: #7000A6;
}

.texto {
  font-size: 15px;
  color: white;
  width: 100%;
  font-weight: bold;
}

.pi-arrow-right{
  font-size: 24px;
}
</style>
