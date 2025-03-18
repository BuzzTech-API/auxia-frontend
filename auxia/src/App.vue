<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import InputPrompt from "./components/InputPrompt.vue"
import BoxTextoInicial from './components/BoxTextoInicial.vue';
import BtnVoltar from './components/BtnVoltar.vue';
</script>

<template>
  <header>

  </header>

  <BoxTextoInicial/>
  <br>
  <InputPrompt/>


  <RouterView />
</template>

<style scoped>

</style>
