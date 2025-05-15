<template>
  <div class="admin-container">
    <h1 class="title">Painel Administrativo</h1>

    <div class="admin-panel">
      <div class="header">

        <div class="search-section">

            <InputText type="text" v-model="value" placeholder="Pesquisar usuário" />
            <Button label="" icon="pi pi-search" iconPos="top" />

        </div>
        <select v-model="filter" class="filter-select">
        <option value="">Todos</option>
        <option value="admin">Administradores</option>
        <option value="comum">Usuários Comuns</option>
        <option value="ativo">Ativos</option>
        <option value="inativo">Inativos</option>
        </select>

        <button class="create-button" @click="handleCreateUser">
        Novo Usuário
        </button>
      </div>

      <!-- Lista de usuários -->
      <UserList />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UserList from '../components/list/UserList.vue'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const searchQuery = ref('')
const filter = ref('')

const handleSearch = () => {
  console.log('Pesquisar por:', searchQuery.value, 'Filtro:', filter.value)
  // Aqui você pode emitir um evento ou aplicar os filtros à lista
}

const handleCreateUser = () => {
  console.log('Criar novo usuário')
}
</script>

<style scoped>
.admin-container {
  min-height: 100vh;
  background-color: #585858;
  padding: 1.5rem;
}

.admin-panel {
  /* max-width: 1000px; */
  margin: 0 auto;
  background-color: #363636;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  padding: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-section {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex: 1;
  min-width: 250px;
}

.search-input {
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 0.9rem;
  flex-grow: 1;
}

.search-button {
  background-color: #4b5563;
  color: #fff;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 1rem;
}

.search-button:hover {
  background-color: #374151;
}

.filter-select {
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 0.9rem;
  background-color: #fff;
  color: #333;
}

.create-button {
  background-color: #9800e0;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s ease-in-out;
  white-space: nowrap;
}

.create-button:hover {
  background-color: #7000a3;
}
</style>
