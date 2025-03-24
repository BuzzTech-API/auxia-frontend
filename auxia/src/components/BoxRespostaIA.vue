<template>
    <div class="boxResposta">

        <h2> Resposta {{ llm }}</h2>

        <p> {{ resposta }} </p>

    </div>

</template>

<style scoped>
.boxResposta{
    align-items: center;
    width: 100%; 
    max-width: 35%;
    padding: 30px; 
    max-height: 450px;
    overflow-y: auto;  
    overflow-x: hidden;
    justify-items: center;
    align-items: center;
    border-radius: 20px;
    text-align: center; 
    background-color: #D9D9D9;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}
</style>

<script>
export default {
  props: ['llm', 'resposta'],
}
</script>