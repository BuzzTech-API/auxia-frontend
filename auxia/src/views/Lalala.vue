<template>
    <div>
        <h1>Lalala View</h1>
        
        <ModalComponent :isVisible="isModalVisible" @close="isModalVisible = false" />
        <button @click="isModalVisible = true">Abrir Modal</button>
            <p>Esta página será excluída posteriormente e substituída pela página de resposta. :)</p>

    <button @click="openModal">
    Open Modal
    </button>

  <ModalRespostaBackErro 
    :open="isOpen" 
    @close="isOpen = false"
    message="Infelizmente houve um problema ao carregar suas respostas"
    icon="pi pi-info-circle" 
  />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalComponent from '@/components/ModalAvaliacao.vue';

const isModalVisible = ref(true);
import ModalRespostaBackErro from '../components/ModalRespostaBackErro.vue';
const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};
</script>