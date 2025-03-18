<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import InputPrompt from './components/InputPrompt.vue';

</script>

<template>
  <header>
    <div>
      <h1>AUXIA</h1>
      <div>
      <InputPrompt/>
    </div>
    </div>
  </header>



  <RouterView />
</template>

<style scoped></style>
