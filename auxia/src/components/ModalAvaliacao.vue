<template>
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal-container">
            <BtnVoltar @click="emit('close')" class="voltar-button" />

            <h2 class="modal-title">Resposta LL1</h2>

            <div class="modal-content">
                <!-- Box de Respostas -->
                <BoxResposta :resposta="respostaTexto" />

                <!-- Box de Criterio -->
                <div class="avaliacao-container">
                    <BoxAvaliacao v-for="(criterio, index) in criterios" :key="index" :criterioNumber="criterio.numero"
                        :criterioDescription="criterio.descricao" />
                </div>
            </div>
            <BtnConfirmarAvaliacao />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import BoxResposta from '@/components/BoxRespostaModal.vue'
import BoxAvaliacao from '@/components/boxes/BoxCriterio.vue'
import BtnConfirmarAvaliacao from './buttons/BtnConfirmarAvaliacao.vue';
import BtnVoltar from './buttons/BtnVoltar.vue';
const emit = defineEmits(['close']);


const props = defineProps<{ isVisible: boolean }>();

const respostaTexto = `Aqui vai a resposta completa do usuário...`;


const criterios = [
    { numero: 1, descricao: 'Descrição do Critério 1 para o usuário' },
    { numero: 2, descricao: 'Descrição do Critério 2 para o usuário' },
    { numero: 3, descricao: 'Descrição do Critério 3 para o usuário' },
];


</script>

<style scoped>
.voltar-button {
    margin-right: auto;
    top: 1rem;
    left: 1rem;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-container {
    background: #D9D9D9;
    padding: 2rem;
    border-radius: 1rem;
    width: 100%;
    max-width: 1100px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
}


.modal-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.modal-content {
    display: flex;
    width: 47rem;
    gap: 1.5rem;
    width: 100%;
}

.avaliacao-container {
    display: flex;
    width: 47rem;
    flex-direction: column;
    gap: 1.5rem;
    max-height: 80vh;
    overflow-y: auto;
}

.confirm-button {
    margin-top: 1.5rem;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    background-color: white;
    color: black;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.confirm-button:hover {
    background-color: #4f4f4f;
}
</style>