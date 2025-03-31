<template>
    <div class="background" v-if="open">
      <div class="card">
        <div class="icone">
          <i :class="icon" style="font-size: 2.5rem; color: gray;"></i>
        </div>
        <p class="texto">{{ message }}</p>
        <BtnRecarregar @click="closeModal"></BtnRecarregar>

      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import BtnRecarregar from './buttons/BtnRecarregar.vue';
  
  const props = defineProps({
    open: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(70, 68, 68, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    color: black;
    width: 430px;
    height: 200px;
    padding: 1rem;
    border-radius: 2rem;
    text-align: center;
  }
  
  .texto {
    font-size: 20px;
    color: gray;
    margin-top: 10px;
  }

  
  </style>
  