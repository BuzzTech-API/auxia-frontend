<template>
  <div class="list-item">
    <div class="user-info">
      <span>{{ user.name }}</span>
      <span>{{ user.email }}</span>
      <span>{{ user.type }}</span>
      <span>
        <span :class="statusClass">
          {{ user.status }}
        </span>
      </span>
    </div>
    <div class="actions">
      <button @click="$emit('edit', user)" class="edit-btn" title="Editar">✏️</button>
      <button @click="showModal = true" class="delete-btn" title="Excluir">🗑️</button>
    </div>

    <!-- Modal de confirmação -->
    <Dialog class="dialog" v-model:visible="showModal" header="Confirmação" modal>
      <p>Tem certeza que deseja excluir este usuário?</p>
      <template #footer>
        <button class="cancel-btn" @click="showModal = false">Cancelar</button>
        <button class="confirm-btn" @click="confirmDelete">Confirmar</button>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import Dialog from 'primevue/dialog'
import { useUserStore } from '@/stores/userStore'

interface User {
  name: string
  email: string
  type: string
  status: 'ativo' | 'inativo'
}

const props = defineProps<{ user: User }>()
const emit = defineEmits<{
  (e: 'delete', payload: {success: boolean, email: string, error?: unknown }): void
  (e: 'edit', user: User): void
}>()

const showModal = ref(false)

const userStore = useUserStore();

const confirmDelete = async () => {
  showModal.value = false
  try {
    await userStore.deleteByEmail(props.user.email)
    emit('delete', { success: true, email: props.user.email })
  } catch (error) {
    emit('delete', { success: false, email: props.user.email, error })
  }
}

const statusClass = computed(() =>
  props.user.status === 'ativo' ? 'status-active' : 'status-inactive'
)
</script>

<style scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 0.1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease-in-out;
}

.list-item:hover {
  background-color: #f9f9f9;
}

.user-info {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  flex: 1;
  font-size: 0.9rem;
  color: #333;
}

.status-active {
  color: green;
  font-weight: 600;
}

.status-inactive {
  color: red;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.edit-btn,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.2s ease-in-out;
}

.edit-btn {
  color: #2563eb;
}

.edit-btn:hover {
  color: #1e40af;
}

.delete-btn {
  color: #dc2626;
}

.delete-btn:hover {
  color: #991b1b;
}

.dialog :deep(.p-dialog) {
  width: 300px;
}

.cancel-btn,
.confirm-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
}

.cancel-btn {
  background-color: #e5e7eb;
  color: #333;
  margin-right: 0.5rem;
}

.confirm-btn {
  background-color: #dc2626;
  color: #fff;
}

.confirm-btn:hover {
  background-color: #991b1b;
}
</style>
