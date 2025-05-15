<template>
    <div class="input-group">
      <label for="password">Senha</label>
      <input
        type="password"
        id="password"
        placeholder="myexamplepassword"
        class="input"
      />
    </div>
  </template>
  
  <style scoped>
  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .input {
    padding: 12px;
    border: none;
    width: 16rem;
    border-radius: 8px;
    background-color: #f9f9f9;
    color: #333;
  }
  </style>
  