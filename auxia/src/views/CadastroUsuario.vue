<script setup lang="ts">
import { ref } from 'vue';
import InputCadastro from '../components/inputs/InputCadastro.vue';

const nome = ref('');
const email = ref('');
const senha = ref('');
const tipoUsuario = ref('Administrador');

function salvar() {
  console.log({ nome: nome.value, email: email.value, senha: senha.value, tipoUsuario: tipoUsuario.value });
}
</script>

<template>
  <div class="container">
    <h1 class="title">Novo Cadastro</h1>

    <div class="container2">
      <div class="panel">
        <InputCadastro
          label="Nome"
          idInput="nome"
          v-model="nome"
          tipoInput="text"
        />

        <InputCadastro
          label="E-mail"
          idInput="email"
          v-model="email"
          tipoInput="email"
        />

        <InputCadastro
          label="Senha"
          idInput="senha"
          v-model="senha"
          tipoInput="password"
        />

        <label for="tipoUsuario" class="label-select">Tipo de usuário:</label>
        <select id="tipoUsuario" v-model="tipoUsuario" class="select-tipo">
          <option>Administrador</option>
          <option>Comum</option>
        </select>

        <button class="btn-salvar" @click="salvar">Salvar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #585858;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.7rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 2rem;
  margin-left: 2rem;
}

.container2{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.panel {
  background-color: #363636;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  max-width: 700px;
}

.label-select {
  color: #DFDFDF;
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: white;
  font-weight: bold;

}

.select-tipo {
  border-radius: 0.375rem;
  padding: 0.6rem;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: #DFDFDF;
  color: black;
  margin-bottom: 1rem;
  width: 95%;
}

.btn-salvar {
  background-color: #9800e0;
  color: #ffffff;
  padding: 0.6rem 1.2rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease-in-out;
  align-self: flex-end;
  width: 80px;
  text-align: center;
}

.btn-salvar:hover {
  background-color: #7000a3;
}
</style>
