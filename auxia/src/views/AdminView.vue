<template>
  <div class="header">
    <MenuUser />
  </div>
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

        <button class="create-button"  @click="showDrawer">
          Novo Usuário
        </button>
      </div>

      <!-- Lista de usuários -->
      <UserList />
    </div>
  </div>

  <!-- Drawer para cadastro de novo usuário -->

   <Drawer v-model:visible="drawerVisible" class="!w-[36rem] !bg-[#42424B] !text-white !border-none">
  <template #header>
    <div class="flex items-center gap-2">
      <h2 class="font-bold text-2xl">Cadastro de Usuário</h2>
    </div>
  </template>

  <div class="flex flex-col p-4 gap-4">
    <label for="name">Nome</label>
    <InputText id="name" v-model="name" type="text" />
    <small v-if="nameError" class="text-red-400">
      Nome é obrigatório e deve ter ao menos 3 caracteres.
    </small>

    <label for="email">Email</label>
    <InputText id="email" v-model="email" type="email" />
    <small v-if="emailError" class="text-red-400">
      Email é obrigatório e deve ser válido.
    </small>

    <label for="password">Senha Inicial</label>
    <InputText id="password" v-model="password" type="password" />
    <small v-if="passwordError" class="text-red-400">
      A senha deve ter no mínimo 8 caracteres, incluir ao menos um número e um caractere especial.
    </small>

    <label for="tipo">Tipo de Usuário</label>
    <Dropdown
      id="tipo"
      v-model="tipoUsuario"
      :options="tipoUsuarioOptions"
      optionLabel="label"
      optionValue="value"
      placeholder="Selecione o tipo"
      class="w-full"
    />
  </div>

  <template #footer>
    <div class="flex items-end gap-4">
      <Button
        label="Cadastrar"
        class="flex w-40 ml-auto !border-none !font-bold !bg-[#9800E0]"
        :disabled="!isFormValid"
        @click="handleNovoUsuario"
      />
    </div>
  </template>
</Drawer> 



</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import UserList from '../components/list/UserList.vue'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import MenuUser from '@/components/menu/MenuUser.vue';
import Drawer from 'primevue/sidebar'
import Dropdown from 'primevue/dropdown';
import axios from 'axios';
import api from '@/services/api';
import { useToast } from 'primevue/usetoast';
import { useUserStore } from '@/stores/userStore';


// drawer
const name = ref('')
const email = ref('')
const password = ref('')
const tipoUsuario = ref("")
const toast = useToast();

const nameError = computed(() => name.value.trim().length < 3)
const emailError = computed(() => !/^\S+@\S+\.\S+$/.test(email.value))
const passwordError = computed(() =>
  !/^(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(password.value)
)

const isFormValid = computed(() =>
  !nameError.value &&
  !emailError.value &&
  !passwordError.value &&
  tipoUsuario.value
)

const tipoUsuarioOptions = [
  { label: 'Administrador', value: 'administrador' },
  { label: 'Comum', value: 'comum' }
]


const drawerVisible = ref(false)

const showDrawer = () => {
  drawerVisible.value = true
}
//-----------------------


const searchQuery = ref('')
const filter = ref('')

const handleSearch = () => {
  console.log('Pesquisar por:', searchQuery.value, 'Filtro:', filter.value)
  
}



const handleNovoUsuario = async () => {
  try {
    // Pega o token do localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Usuário não autenticado.',
        life: 3000
      });
      return;
    }
    
    const response = await api.get('/user', {
      params: { email: email.value },
      headers: { Authorization: `Bearer ${token}` }
    });

    const usuariosEncontrados = response.data;

    const emailExiste = usuariosEncontrados.some(
      (usuario) => usuario.usr_email.toLowerCase() === email.value.toLowerCase()
    );

    if (emailExiste) {
      toast.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Email já está cadastrado!',
        life: 3000
      });
      return;
    }

    const novoUsuario = {
      usr_name: name.value,
      usr_email: email.value,
      usr_password: password.value,
      usr_is_adm: tipoUsuario.value === 'administrador',
      usr_is_active: true
    };

    console.log('novo usuario', novoUsuario);

    await api.post('/user', novoUsuario, {
      headers: { Authorization: `Bearer ${token}` }
    });

    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Usuário cadastrado com sucesso!',
      life: 3000
    });

    drawerVisible.value = false;
    name.value = '';
    email.value = '';
    password.value = '';
    tipoUsuario.value = '';

  } catch (error: any) {
    console.error('Erro ao cadastrar usuário:', error);
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: error.response?.data?.detail || 'Erro ao cadastrar usuário.',
      life: 3000
    });
  }

  const userStore = useUserStore()
  userStore.getAll()
};












</script>

<style scoped>
.admin-container {
  min-height: 100vh;
  background-color: #585858;
  padding: 1.5rem;
}

.header {
  width: 100%;
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
