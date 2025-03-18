<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import InputPrompt from "./components/InputPrompt.vue"
import BoxTextoInicial from './components/BoxTextoInicial.vue';
import BtnVoltar from './components/BtnVoltar.vue';
</script>

<template>
  <header>
    <div>
      <BtnVoltar/>
      <h1>AUXIA</h1>
    </div>
  </header>

  <BoxTextoInicial/>
  <br>
  <InputPrompt/>


  <RouterView />
</template>

<style scoped>


</style>
