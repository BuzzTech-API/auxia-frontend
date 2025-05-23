<template>
  <Toast/>
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
      <button @click="openResetPasswordModal" class="reset-passwd" title="Redefinir senha">🔑</button>
      <button @click="$emit('edit', user)" class="edit-btn" title="Editar">✏️</button>
      <button @click="showModal = true" class="delete-btn" title="Excluir">🗑️</button>
    </div>

    <!-- Modal redefinição de senha (com input + botão copiar) -->
    <Dialog class="dialog" v-model:visible="showResetModal" header="Nova Senha Gerada" modal>
      <div class="password-row">
        <input type="text" v-model="generatedPassword" readonly class="password-input" />
        <BtnCopiar :text="generatedPassword" />
      </div>
      <template #footer>
        <button class="cancel-btn" @click="showResetModal = false">Cancelar</button>
        <button class="confirm-btn-passwd" @click="showConfirmResetModal = true">Confirmar</button>
      </template>
    </Dialog>

    <!-- Modal de confirmação final -->
    <Dialog class="dialog" v-model:visible="showConfirmResetModal" header="Confirmar Redefinição" modal>
      <p>Tem certeza que deseja redefinir a senha?</p>
      <template #footer>
        <button class="cancel-btn" @click="showConfirmResetModal = false">Cancelar</button>
        <button class="confirm-btn-passwd" @click="confirmResetPassword">Confirmar</button>
      </template>
    </Dialog>

    <!-- Modal de exclusão -->
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
import BtnCopiar from '../buttons/BtnCopiar.vue'
import { useUserStore } from '@/stores/userStore'
import { useToast, Toast } from 'primevue';


interface User {
  name: string
  email: string
  type: string
  status: 'ativo' | 'inativo'
}

const props = defineProps<{ user: User }>()

const emit = defineEmits<{
  (e: 'delete', user: User): void
  (e: 'edit', user: User): void
}>()

const showModal = ref(false)
const showResetModal = ref(false)
const showConfirmResetModal = ref(false)

const generatedPassword = ref('') // Placeholder

const openResetPasswordModal = () => {
  // Local para gerar uma senha aleatória
  generatedPassword.value = 'NovaSenha#' + Math.floor(Math.random() * 1000)
  showResetModal.value = true
}

const userStore = useUserStore();

const toast = useToast();

const confirmDelete = async () => {
  showModal.value = false
  try {
    await userStore.deleteByEmail(props.user.email)
    toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Usuário excluido com sucesso!',
        life: 3000
      })
    emit('delete', props.user)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Falha!',
      detail: 'Falha ao excluir usuário!',
      life: 3000
    })
    emit('delete', props.user)
  }
}

const confirmResetPassword = () => {
  emit('edit', props.user)
  showConfirmResetModal.value = false
  showResetModal.value = false
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

.confirm-btn-passwd{
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  background-color: #10b981;
  color: #fff;
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

.password-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.password-input {
  flex: 1;
  padding: 0.4rem 0.6rem;
  border: 1px solid #cfc8c8;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
}
.reset-passwd{
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  font-size: 1rem;
  color: #1e40af;
}

.reset-passwd:focus {
  outline: none;
  box-shadow: none;
}

</style>
