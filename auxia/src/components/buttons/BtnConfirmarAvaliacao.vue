<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';


defineProps({
  disabled: Boolean
});

const emit = defineEmits(["click"]);

</script>

<template>
  <div>
    <button class="botao"
    :class="{'disabled': disabled}"
    :disabled="disabled"
     @click="emit('click')">
      <p class="texto"> Confirmar Avaliação </p>
      <i class="pi pi-arrow-right"></i>
    </button>
  </div> 
</template>

<style scoped>
.botao {
  display: flex;
  justify-content: center;
  width: 160px;
  height: 45px;
  border-radius: 12px; 
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:  #D9D9D9;
  color: black;
  border: none;
  padding-right: 20px;
}
.texto {
  font-size: 15px;
}

.pi-arrow-right{
  font-size: 24px;
}

.botao:hover {
  /*background-color: #4F4F4F;*/
  transition: 300ms;
  transition-delay: 50ms;
  background-color: rgba(0,0,0,0)
}

.botao.disabled {
  /*background-color: #A0A0A0;*/
  opacity: 0.6;
  cursor: not-allowed;
}
</style>