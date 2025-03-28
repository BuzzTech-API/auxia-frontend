<template>

    <div class="container">
        <div class="criterio">
            <h4>{{criterio}}</h4>
            <p>{{ descricao }}</p>
        </div>

        <hr>

        <div class="nota">
            <p> Nota:</p>
            <p>{{nota}}</p>
        </div>
    </div>

</template>

<script setup lang="ts">
defineProps<{
    criterio : string;
    descricao: string;
    nota: number

}>();

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: black;
  width: 293px;
  height: auto;
  padding: 0.8rem;
  border-radius: 1rem;
  box-shadow: -3px 8px 10px -9px rgba(66, 68, 90, 1);
}

.criterio {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

hr{
    margin-right: 1rem;
    margin-left: 1rem;
    width:  auto;
    height: 10rem;

}

.nota{
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-items: center;
    text-align: center;
    gap: 0.7rem;
}


</style>