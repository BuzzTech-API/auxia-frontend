<template>
  <div class="container">
    <div class="criterio">
      <p class="nomeCriterio">{{ criterio }}</p>
      <p>{{ descricao }}</p>
    </div>

    <div class="nota">
      <p class="nota-label">Nota</p>
      <p class="nota-valor">{{ nota }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  criterio: string;
  descricao: string;
  nota: number;
}>();
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #585858; /* cor similar ao fundo desejado */
  color: white;
  width: 42.3rem;
  padding: 0.8rem 1rem;
  border-radius: 0.8rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-right: 1rem;
}

.criterio {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
}

.nomeCriterio{
    size: 20px;

}

.nota {
  background-color: #2a2a2a; /* caixa escura */
  padding: 0.5rem 1rem;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.4);
}

.nota-label {
  font-weight: bold;
  font-size: 0.75rem;
}

.nota-valor {
  font-size: 1rem;
  font-weight: bold;
}
</style>
