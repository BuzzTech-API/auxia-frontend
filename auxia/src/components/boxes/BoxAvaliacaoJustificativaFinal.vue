<template>
    <Card class="card">
      <template #content>
        <div class="inputGroup">
          <div class="radioDiv">
            <label for="opcao1">Prefere muito a resposta da LLM1</label>
            <RadioButton v-model="preferencia" inputId="opcao1" name="nota" :value="1" />
          </div>
          <div class="radioDiv">
            <label for="opcao2">Prefere a resposta da LLM1</label>
            <RadioButton v-model="preferencia" inputId="opcao2" name="nota" :value="2" />
          </div>
          <div class="radioDiv">
            <label for="opcao3">Sem preferência de resposta</label>
            <RadioButton v-model="preferencia" inputId="opcao3" name="nota" :value="3" />
          </div>
          <div class="radioDiv">
            <label for="opcao4">Prefere a resposta da LLM2</label>
            <RadioButton v-model="preferencia" inputId="opcao4" name="nota" :value="4" />
          </div>
          <div class="radioDiv">
            <label for="opcao5">Prefere muito a resposta da LLM2</label>
            <RadioButton v-model="preferencia" inputId="opcao5" name="nota" :value="5" />
          </div>
        </div>
        <div class="justificativa">
          <h3>Justificativa</h3>
          <Textarea class="textarea" v-model="justify" rows="3" />
        </div>
      </template>
    </Card>
  </template>
  
  <script setup lang="ts">
  import Card from 'primevue/card';
  import RadioButton from 'primevue/radiobutton';
  import Textarea from 'primevue/textarea';
  import { ref } from 'vue';
  
//   defineProps<{ 
//   preferencia: number;
//   justify: string;
//   }>();

//   const emit = defineEmits(['update:preferencia', 'update:justify']);
  
  const preferencia = ref(0);
  const justify = ref("");
  </script>
  
  <style scoped>
  .card {
    width: 100%;
    max-width: 900px;
    margin: auto;
    border-radius: 1rem;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    background-color: #D9D9D9;
    text-align: center;
  }
  
  .inputGroup {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
  
  .radioDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 1rem;
    max-width: 100px;
  }
  
  .justificativa {
    margin-top: 1rem;
  }
  
  .textarea {
    width: 100%;
    background-color: #ffffff;
    border-radius: 5px;
  }
  </style>
  