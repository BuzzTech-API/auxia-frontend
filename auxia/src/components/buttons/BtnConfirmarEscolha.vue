<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  disabled: Boolean,
});

const emit = defineEmits(["click"]);

</script>

<template>
  <div>
    <button class="confirm-button"
    :class="{'disabled': disabled}"
    :disabled="disabled"
     @click="emit('click')">
      <p class="texto"> Confirmar Escolha </p>
    </button>
  </div>
</template>

<style scoped>
.confirm-button {
  margin-top: 1.0rem;
  margin-left: -1rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background-color: #d9d9d9;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  transition: background-color 0.3s;
  display: flex;
  width: 160px;
  height: 45px;
  align-items: center;
  justify-content: center;
  color: black;
  border: none;
}

.confirm-button:hover {
  background-color: #7B7B7B;
  transition: 300ms;
  transition-delay: 50ms;
}

.confirm-button.disabled {
  background-color: #A0A0A0;
  cursor: not-allowed;

}

.texto {
  font-size: 15px;
}

.pi-arrow-right{
  font-size: 24px;
}
</style>
