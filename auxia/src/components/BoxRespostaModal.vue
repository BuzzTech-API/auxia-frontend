<template>
  <div class="container">
    <p class="text">
      {{props.resposta}}
    </p>

  </div>
</template>


<script setup lang="ts">
const props = defineProps<{resposta: string}>();

</script>

<style scoped>
.container{
  width: 36.5rem;
  height: 40rem;
  background-color: #D9D9D9;
  padding: 1.5rem;
  overflow-y: auto;
}
.text{
  font-size: 1.25rem;
  font-family: sans-serif;
}
</style>
