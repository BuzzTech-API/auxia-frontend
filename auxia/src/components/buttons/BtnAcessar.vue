<template>
    <button class="btn-login" @click="handleLogin">
      Acessar
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" stroke="white" stroke-width="1.5" fill="none">
        <path d="M1 8h11.793l-3.147-3.146M12.793 8.5L9.646 11.646" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </template>
  
  <script setup>
  function handleLogin() {
    console.log("Fazendo login...");
  }
  </script>
  
  <style scoped>
  .btn-login {
    display: inline-flex;
    width: 9rem;
    align-items: center;
    gap: 19px;
    background-color: #9800E0;
    color: white;
    padding: 6px 6px 6px 15px;
    border: none;
    border-radius: 10px;
    font-size: 17px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-login:hover {
    background-color: #7a00b5;
  }
  
  .icon {
    width: 28px;
    height: 28px;
  }
  </style>
  