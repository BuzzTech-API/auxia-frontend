<template>
    <div>
        <h1>Lalala View</h1>
        
        <ModalComponent :isVisible="isModalVisible" @close="isModalVisible = false" />
        <button @click="isModalVisible = true">Abrir Modal</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalComponent from '@/components/ModalAvaliacao.vue';

const isModalVisible = ref(true);
</script>

  