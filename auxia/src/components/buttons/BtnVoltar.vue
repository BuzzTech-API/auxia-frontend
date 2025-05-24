<template>
  <div>
    <Button class="botao">
      <i class="pi pi-arrow-left"></i>
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
</script>

<style scoped>
.botao {
  margin-top: 1rem;
  margin-left: auto;
  margin-right: 10px;
  width: 40px; /* largura e altura iguais para deixar redondo */
  height: 40px;
  padding: 0; /* remove excesso */
  font-size: 1.2rem; /* tamanho do ícone */
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50%; /* deixa redondo */
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.botao:hover {
  background-color: #4F4F4F;
}
</style>
