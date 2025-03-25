<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-container">
        <button class="close-button" @click="closeModal">✖</button>
  
        <h2 class="modal-title">Resposta LL1</h2>
  
        <div class="modal-content">
          <!-- Box de Respostas -->
          <BoxResposta :resposta="respostaTexto" />
  
          <!-- Box de Avaliação -->
          <div class="avaliacao-container">
            <BoxAvaliacao
              v-for="(criterio, index) in criterios"
              :key="index"
              :criterioNumber="criterio.numero"
              :criterioDescription="criterio.descricao"
            />
          </div>
        </div>
  
        <button class="confirm-button">Confirmar Avaliação</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import BoxResposta from '@/components/BoxRespostaModal.vue'
  import BoxAvaliacao from '@/components/boxes/BoxCriterio.vue'
  
  const props = defineProps<{ isVisible: boolean }>();
  
  const respostaTexto = `Aqui vai a resposta completa do usuário...`;
  
 
  const criterios = [
    { numero: 1, descricao: 'Descrição do Critério 1 para o usuário' },
    { numero: 2, descricao: 'Descrição do Critério 2 para o usuário' },
    { numero: 3, descricao: 'Descrição do Critério 3 para o usuário' },
  ];
  
  const closeModal = () => {
    console.log('Fechar modal');
  };
  </script>
  
  <style scoped>
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
    background: white;
    padding: 2rem; 
    border-radius: 1rem;
    width: 90%; 
    max-width: 1100px; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .modal-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .modal-content {
    display: flex;
    gap: 1.5rem;
    width: 100%; 
  }
  
  .avaliacao-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem; 
    max-height: 80vh; 
    overflow-y: auto; 
  }
  
  .confirm-button {
    margin-top: 1.5rem;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .confirm-button:hover {
    background-color: #4f4f4f;
  }
  </style>
  