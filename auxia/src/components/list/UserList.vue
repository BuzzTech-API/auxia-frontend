<template>
  <div class="user-list-container">
    <h2 class="title">Lista de Usuários</h2>

    <div v-if="users.length" class="user-list">
      <ListItem
        v-for="user in users"
        :key="user.email"
        :user="user"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <div v-else class="empty-message">
      Nenhum usuário cadastrado.
    </div>
  </div>
</template>

<script lang="ts" setup>
import ListItem from './ListItem.vue'
import { ref } from 'vue'

interface User {
  name: string
  email: string
  type: string
  status: 'ativo' | 'inativo'
}

// Lista hardcoded de exemplo (substituir pelo fetch do backend)
const users = ref<User[]>([
  { name: 'Vitor Lima', email: 'lima@auxia.com', type: 'admin', status: 'ativo' },
  { name: 'Ivan Germano', email: 'germano@auxia.com', type: 'comum', status: 'inativo' },
  { name: 'Vitor Lima', email: 'lima@auxia.com', type: 'admin', status: 'ativo' },
  { name: 'Ivan Germano', email: 'germano@auxia.com', type: 'comum', status: 'inativo' },
])

const handleEdit = (user: User) => {
  console.log('Editar usuário:', user)
}

const handleDelete = (user: User) => {
  console.log('Excluir usuário:', user)
}
</script>

<style scoped>
html {
  font-family: Roboto;
}

.user-list-container {
  width: 100%;
  margin: 2rem auto 0 auto;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #fff;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-message {
  color: #6b7280;
  text-align: center;
  padding: 2rem 0;
}
</style>
