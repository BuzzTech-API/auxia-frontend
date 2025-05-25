<template>
  <Card class="card">
    <template #content>
      <div class="inputGroup">

        <div class="radioDiv">
          <div>
            <i class="pi pi-check-circle" style="color: #01CF68" />
          </div>
          <div>
            <label for="opcao1">Prefere MUITO a resposta 1</label>
          </div>
          <div>
            <RadioButton 
              v-model="preferencia" 
              inputId="opcao1" 
              name="nota" 
              value="Prefere muito a resposta da LLM1" 
              :class="{ 'p-invalid': !preferencia }" 
            />
          </div>
        </div>

        <div class="radioDiv">
          <div>
            <i class="pi pi-check-circle" style="color: #FFCC00" />
          </div>
          <div>
            <label for="opcao2">Prefere resposta 1</label>
          </div>
          <div class="radioBTN">
            <RadioButton 
              v-model="preferencia" 
              inputId="opcao2" 
              name="nota" 
              value="Prefere a resposta da LLM1" 
              :class="{ 'p-invalid': !preferencia }" 
            />
          </div>
        </div>

        <div class="radioDiv">
          <div>
            <i class="pi pi-equals" style="color: #0772E6" />
          </div>
          <div>
            <label for="opcao3">Sem preferência de resposta</label>
          </div>
          <div>
            <RadioButton 
              v-model="preferencia" 
              inputId="opcao3" 
              name="nota" 
              value="Sem preferência de resposta" 
              :class="{ 'p-invalid': !preferencia }" 
            />
          </div>
        </div>

        <div class="radioDiv">
          <div>
            <i class="pi pi-check-circle" style="color: #FFCC00" />
          </div>
          <div>
            <label for="opcao4">Prefere resposta 2</label>
          </div>
          <div class="radioBTN">
            <RadioButton 
              v-model="preferencia" 
              inputId="opcao4" 
              name="nota" 
              value="Prefere a resposta da LLM2" 
              :class="{ 'p-invalid': !preferencia }" 
            />
          </div>
        </div>

        <div class="radioDiv">
          <div>
            <i class="pi pi-check-circle" style="color: #01CF68" />
          </div>
          <div>
            <label for="opcao5">Prefere MUITO resposta 2</label>
          </div>
          <div>
            <RadioButton 
              v-model="preferencia" 
              inputId="opcao5" 
              name="nota" 
              value="Prefere muito a resposta da LLM2" 
              :class="{ 'p-invalid': !preferencia }" 
            />
          </div>
        </div>

      </div>

      <div class="justificativa">
        <h3>Justificativa</h3>
        <Textarea 
          class="textarea" 
          v-model="justify" 
          rows="3" 
          :invalid="!justify.trim()" 
          placeholder="Escreva sua justificativa aqui. Ex: A resposta 1 foi melhor pois...." 
        />
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
    awnserOne.ans_prefered_answer= newPreferencia
    awnserTwo.ans_prefered_answer = newPreferencia
  });
  watch(justify, (newJustify) => {
    awnserOne.ans_prefered_answer_justify = newJustify
    awnserTwo.ans_prefered_answer_justify = newJustify

  });


  </script>

<style>
.card {
  width: 97%;
  max-width: 900px;
  margin: auto;
  border-radius: 1rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  background-color: #363636;
  text-align: center;
  color: #ffffff;
}

.card,
.card .p-card,
.card .p-card-body {
  background-color: #363636 !important;
  color: #ffffff;
}

.inputGroup {
  display: flex;
  justify-content: space-between;
}

.radioDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 0.85rem;
  width: 120px; /* Mesma largura para todos */
  gap: 0.3rem;
  flex-shrink: 0; /* Impede que diminuam */
}

.radioDiv i {
  font-size: 1.2rem;
}

.radioBTN{
  margin-top: 1.3rem;
}

.justificativa {
  margin-top: 1rem;
}

.textarea {
  width: 100%;
  background-color: #585858;
  border-radius: 5px;
  color: #ffffff;
}

.p-radiobutton.p-invalid .p-radiobutton-box {
  border: 2px solid red !important;
}

</style>

