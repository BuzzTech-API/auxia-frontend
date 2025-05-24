<template>
  <div class="user-container">
    <h1 class="title">Olá {{ usuario.nome }}</h1>

    <div class="user-panel">
      <!-- Botão de editar no canto superior direito -->
      <!-- <div class="edit-icon-wrapper">
        <BtnEditarSenha />
      </div> -->

      <!-- Campos de visualização -->
      <div class="field">
        <label>Email:</label>
        <div class="readonly-box">{{ usuario.email }}</div>
      </div>

      <div class="field">
        <label>Nome:</label>
        <div class="readonly-box">{{ usuario.nome }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BtnEditarSenha from '@/components/buttons/BtnEditarSenha.vue'

interface Usuario {
  nome: string
  email: string
}

const usuario = ref<Usuario>({
  nome: 'Centro Paula Souza',
  email: 'fatec@fatec.sp.gov.br',
})
</script>

<style scoped>
.user-container {
  min-height: 100vh;
  background-color: #585858;
  padding: 1.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 1.5rem;
}

.user-panel {
  position: relative;
  margin: 0 auto;
  background-color: #363636;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  padding: 3rem;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.edit-icon-wrapper {
  display: flex;
  justify-content: flex-end;
  top: 1rem;
  right: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label {
  color: #ffffff;
  font-weight: bold;
  font-size: 0.95rem;
}

.readonly-box {
  background-color: #d9d9d9;
  color: #000;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
}
</style>
