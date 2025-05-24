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
  width: 45px;
  height: 45px;
  align-items: center;
  white-space: nowrap;  
}

.botao:hover {
  background-color: #4F4F4F;
}
</style>