<template>
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
</template>

<script setup lang="ts">
import ModalRespostaBackErro from '../components/ModalRespostaBackErro.vue';
import { ref } from 'vue';


const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};
</script>