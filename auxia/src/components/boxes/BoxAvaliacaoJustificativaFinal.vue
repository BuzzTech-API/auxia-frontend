<template>
    <Card class="card">
      <template #content>
        <div class="inputGroup">
          <div class="radioDiv">
            <label for="opcao1">Prefere muito a resposta da LLM1</label>
            <RadioButton v-model="preferencia" inputId="opcao1" name="nota" value="Prefere muito a resposta da LLM1" :class="{ 'p-invalid': !preferencia }"/>
          </div>
          <div class="radioDiv">
            <label for="opcao2">Prefere a resposta da LLM1</label>
            <RadioButton v-model="preferencia" inputId="opcao2" name="nota" value="Prefere a resposta da LLM1" :class="{ 'p-invalid': !preferencia }"/>
          </div>
          <div class="radioDiv">
            <label for="opcao3">Sem preferência de resposta</label>
            <RadioButton v-model="preferencia" inputId="opcao3" name="nota" value="Sem preferência de resposta" :class="{ 'p-invalid': !preferencia }"/>
          </div>
          <div class="radioDiv">
            <label for="opcao4">Prefere a resposta da LLM2</label>
            <RadioButton v-model="preferencia" inputId="opcao4" name="nota" value="Prefere a resposta da LLM2" :class="{ 'p-invalid': !preferencia }"/>
          </div>
          <div class="radioDiv">
            <label for="opcao5">Prefere muito a resposta da LLM2</label>
            <RadioButton v-model="preferencia" inputId="opcao5" name="nota" value="Prefere muito a resposta da LLM2" :class="{ 'p-invalid': !preferencia }"/>
          </div>
        </div>
        <div class="justificativa">
          <h3>Justificativa</h3>
          <Textarea class="textarea" v-model="justify" rows="3" :invalid="!justify.trim()" placeholder="Escreva sua justificaviva aqui. Ex: A resposta 1 foi melhor pois...."/>
        </div>
      </template>
    </Card>
  </template>

  <script setup lang="ts">
  import { useAwnserOneStore } from '@/stores/awnserOne';
  import { useAwnserTwoStore } from '@/stores/awnserTwo';
  import Card from 'primevue/card';
  import RadioButton from 'primevue/radiobutton';
  import Textarea from 'primevue/textarea';
  import { ref, watch } from 'vue';

  const awnserOne = useAwnserOneStore()
  const awnserTwo = useAwnserTwoStore();

 //const value = ref(null);

//   defineProps<{
//   preferencia: number;
//   justify: string;
//   }>();

//   const emit = defineEmits(['update:preferencia', 'update:justify']);

  const preferencia = ref(awnserOne.ans_prefered_answer);
  const justify = ref(awnserOne.ans_prefered_answer_justify);

  watch(preferencia, (newPreferencia) => {
    console.log(newPreferencia)
    awnserOne.ans_prefered_answer = newPreferencia
    awnserTwo.ans_prefered_answer = newPreferencia
  });
  watch(justify, (newJustify) => {
    awnserOne.ans_prefered_answer_justify = newJustify
    awnserTwo.ans_prefered_answer_justify = newJustify

  });


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

  .p-radiobutton.p-invalid .p-radiobutton-box {
  border: 2px solid red !important;
}

  </style>

