<script setup lang="ts">
import BoxTextoInicial from '@/components/BoxTextoInicial.vue';
import InputPrompt from '@/components/inputs/InputPrompt.vue'; 
import BoxRespostaIA from '@/components/BoxRespostaIA.vue'; 
</script>

<template>
  <div class="container">
    <div class="box">
      <BoxRespostaIA/>
      <!-- <BoxTextoInicial />  -->
    </div>
    <div class="input">
      <!-- <InputPrompt /> -->
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  position: relative;
}

.box {
  display: flex;
  justify-content: center;
}

.input {
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
