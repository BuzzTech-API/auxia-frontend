<template>
  <div class="main">
    <div class="container">
      <h2>Login</h2>
      <div class="inputcontainer">
        <label for="email">Email</label>
        <input v-model="email" />
      </div>
      <div class="inputcontainer">
        <label for="password">Senha</label>
        <input type="password" v-model="password" />
      </div>
      <button v-on:click="logar">Logar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('')
const password = ref('')
const userStore = useUserStore()
const route = useRouter()
const logar = async () => {
  await userStore.login(email.value, password.value)
  route.replace("/")
}


</script>

<style scoped>
.container {
  display: flex;
  gap: 2rem;
  background: #363636;
  flex-direction: column;
  color: #FFF;
  align-items: center;
  padding: 4rem;
  border-radius: 3rem;
  width: 30rem;
  height: 30rem;
}

.main {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.inputcontainer {
  display: flex;
  flex-direction: column;
  color: #FFF;
  width: 20rem;
}
</style>
