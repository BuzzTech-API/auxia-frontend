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
import { onMounted, computed } from 'vue'
import ListItem from './ListItem.vue'
import { useUserStore } from '@/stores/userStore'

interface User {
  name: string
  email: string
  type: string
  status: 'ativo' | 'inativo'
}

const emit = defineEmits<{
  (e: 'delete', user: any): void
  (e: 'edit', user: any): void
}>()

const userStore = useUserStore();

onMounted(() => {
  userStore.getAll(); 
})

const users = computed(() => userStore.usrs)

const handleEdit = (user: any) => {
  emit('edit', user)
}

const handleDelete = (user: any) => {
  emit('delete', user)
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
