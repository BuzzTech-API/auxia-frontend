<template>
  <div>
    <button class="edit-button" @click="openModal">
      Editar ✏️
    </button>

    <Dialog 
      class="dialog" 
      v-model:visible="showModal" 
      header="Editar informações" 
      modal 
      :style="{ width: '500px' }"
    >
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="form.email" readonly />
      </div>

      <div class="form-group">
        <label>Nome:</label>
        <input type="text" v-model="form.nome" />
      </div>

      <div class="form-group">
        <label>Nova Senha:</label>
        <input type="password" v-model="form.senha" />
      </div>

      <div class="form-group">
        <label>Confirmar Nova Senha:</label>
        <input type="password" v-model="form.confirmarSenha" />
      </div>

      <template #footer>
        <button class="cancel-btn" @click="showModal = false">Cancelar</button>
        <button class="confirm-btn" @click="handleConfirm">Salvar</button>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'

interface Props {
  email: string
  nome: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', data: { email: string; nome: string; senha: string }): void
}>()

const showModal = ref(false)

const form = ref({
  email: '',
  nome: '',
  senha: '',
  confirmarSenha: ''
})

const openModal = () => {
  form.value.email = props.email
  form.value.nome = props.nome
  form.value.senha = ''
  form.value.confirmarSenha = ''
  showModal.value = true
}

const handleConfirm = () => {
  if (form.value.senha !== form.value.confirmarSenha) {
    alert('As senhas não coincidem!')
    return
  }

  emit('update', {
    email: form.value.email,
    nome: form.value.nome,
    senha: form.value.senha
  })

  showModal.value = false
}
</script>

<style scoped>
.edit-button {
  background-color: #e0d500;
  color: #000;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease-in-out;
}

.edit-button:hover {
  background-color: #c9bf00;
}

.dialog :deep(.p-dialog-content) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: #fff;
}

.form-group input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  background-color: #eee;
}

.cancel-btn,
.confirm-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.cancel-btn {
  background-color: #999;
  color: white;
  margin-right: 0.5rem;
}

.confirm-btn {
  background-color: #e0d500;
  color: black;
  font-weight: bold;
}

.confirm-btn:hover {
  background-color: #c9bf00;
}
</style>
