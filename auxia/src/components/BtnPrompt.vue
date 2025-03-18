<template>
  
    <Button class="botao" icon="pi pi-arrow-right"/>

</template>

<script setup>
import Button from 'primevue/button';
</script>

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
</style>