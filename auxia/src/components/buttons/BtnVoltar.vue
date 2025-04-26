<template>
  <div>
    <Button class="botao">
      <i class="pi pi-arrow-left"></i>
      <p class="texto"> Voltar Etapa </p>
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

</script>

<style scoped>
.botao {
  margin-top: 1.0rem;
  margin-left: auto;
  margin-right: 10px;
  padding: 0.2rem 1rem;
  font-size: 1rem;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  /*gap: 0.7rem;*/
  width: 160px;
  height: 30px;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  white-space: nowrap;  
}

.botao:hover {
  background-color: #4F4F4F;
}
</style>