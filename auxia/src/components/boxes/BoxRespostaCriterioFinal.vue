<script setup lang="ts">
import BoxCriterioNotaFinal from "@/components/boxes/BoxCriterioNotaFinal.vue";
import BoxRespostaCriterioFinal from "@/components/boxes/BoxCriterioNotaFinal.vue";
import { marked } from "marked";
import { computed } from "vue";

const props = defineProps<{
    llm: string;
    resposta: string;
    awnserNumber: number;
    criterios: { numero: number; descricao: string; criterio: string; nota: number }[];
}>();

// Computed property para converter a string Markdown para HTML
const respostaHTML = marked.parse(props.resposta);
</script>

<template>
  <div class="card">
        <div>
            <p>{{ llm }}</p>
        </div>

        <div>
            <p>Resposta:</p>
            <div class="respostaLLM" v-html="respostaHTML"></div>
            <p>Critérios e Notas:</p>
        </div>

        <div class="criterios">
            <div v-for="(crit, index) in criterios" :key="index">
                <BoxCriterioNotaFinal
                :awnserNumber="awnserNumber"
                :criterio="crit.criterio"
                :descricao="crit.descricao"
                :nota="crit.nota"
                />
            </div>
        </div>
  </div>
</template>

<style scoped>
p{
    color: black;
    font-size: 18px;
}
.card {
    display: flex;
    flex-direction: column;
    min-width: 28rem;
    height: 27rem; /* Ajuste a altura para garantir que a rolagem funcione */
    overflow-y: auto;
    overflow-x: hidden;
    align-items: center;
    justify-content: flex-start; /* Ajuste para manter os itens alinhados no topo */
    background-color: #d9d9d9;
    border-radius: 10px;
    padding: 0.3rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


.respostaLLM{
    background-color: white;
    width: 38.6rem;
    height: 15.3rem;
    overflow-y: auto;
    padding: 0.8rem;
    border-radius: 10px;
}

.criterios{
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 38rem;
    flex-wrap: wrap;
    gap: 1rem;


}

</style>
