<template>
  <Toast position="top-center" />
  <div class="main">
    <img class="logo" src="/logo2.png" />

    <div class="container">
      <h1 class="headerText">LOGIN</h1>

      <!-- Inputs controlados -->
      <InputEmail v-model="email" :inputRef="emailField" />
      <InputSenha v-model="password" :inputRef="passwordField" />

      <!-- Botão de acesso -->
      <BtnAcessar :handleLogin="logar" :disabled="isLoading || !email || !password" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import Toast from 'primevue/toast';
import { useToast } from 'primevue';

import InputEmail from '@/components/inputs/InputEmail.vue'
import InputSenha from '@/components/inputs/InputSenha.vue'
import BtnAcessar from '@/components/buttons/BtnAcessar.vue'

const email = ref('')
const password = ref('')

const emailField = ref<HTMLInputElement | null>(null)
const passwordField = ref<HTMLInputElement | null>(null)

const isLoading = ref(false)

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()

async function logar() {
  isLoading.value = true
  try {
    await userStore.login(email.value, password.value)
    router.replace('/')
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Erro ao Fazer Login!',
      detail: 'Erro ao fazer login. Verifique suas credenciais e tente novamente.',
      life: 3000
    })
    // opcional: focar o campo de email ou senha após erro
    emailField.value?.focus()
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.container {
  display: flex;
  gap: 3rem;
  background: #363636;
  flex-direction: column;
  color: #FFF;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-shadow: rgba(255, 255, 255, 0.53) 0px 4px;
  width: 35rem;
  height: 100%;
}

.headerText {
  font-size: 4rem;
  margin: 0;
}

.logo {
  width: 50rem;
}

.main {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 10rem;
}
</style>
