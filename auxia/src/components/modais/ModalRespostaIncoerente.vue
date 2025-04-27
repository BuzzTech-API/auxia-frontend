<template>
  <div class="background" v-if="open">
    <div class="card">
      <div class="icone">
        <p class="titulo">{{ titulo }}</p>
      </div>

      <p class="texto">{{ message }}</p>

      <div class="btnAlinhamento">
        <Button class="btn" @click="irParaPagina">Revisar Critérios</Button>
        <Button class="btn" @click="emit('click')">Entendi</Button>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import BtnRecarregar from './buttons/BtnRecarregar.vue';
import router from '@/router';

const irParaPagina = () => {
  router.push('/resposta');
};

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
});

const emit = defineEmits(["click"]);


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
  background-color: #d9d9d9;
  padding: 2rem;
  color: black;
  width: 34rem;
  height: 15rem;
  border-radius: 2rem;
  text-align: center;
}

.texto {
  font-size: 18px;
  color: rgb(0, 0, 0);
  margin-top: 10px;
}

.titulo {
  font-size: 22px;
  color: rgb(0, 0, 0);
  margin-top: 10px;
}

.btnAlinhamento {
  display: flex;
  flex-direction: row;
  align-self: end;
  justify-content: space-between;
  padding: 10px;
  width: 60%;



}

.btn {
  border-radius: 15px;
  padding: 12px;
  border: none;
  color: rgb(0, 0, 0);
  background-color: white;

}
</style>
