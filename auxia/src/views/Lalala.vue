<template>
    <div>
        <h1>Lalala View</h1>

        <ModalGenerico :open="isOpen"
        @close="isOpen = false" titulo="ATENÇÃO" message="Sua resposta está incoerrente com sua avaliação, deseja prosseguir mesmo assim?"
        />

        <!-- <ModalComponent :isVisible="isModalVisible" :awnserNumber="1" @close="isModalVisible = false" />
        <button @click="isModalVisible = true">Abrir Modal</button>
            <p>Esta página será excluída posteriormente e substituída pela página de resposta. :)</p> -->

    <button @click="openModal">
    Open Modal
    </button>

  <!-- <ModalRespostaBackErro
    :open="isOpen"
    @close="isOpen = false"
    message="Infelizmente houve um problema ao carregar suas respostas"
    icon="pi pi-info-circle"
  /> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const isModalVisible = ref(true);
// import ModalRespostaBackErro from '../components/ModalRespostaBackErro.vue';
import ModalGenerico from '@/components/modais/ModalRespostaIncoerente.vue';
const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};
</script>
