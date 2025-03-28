<template>
  <Card class="card">
    <template #title><h3 class="cardtitle">Critério {{props.criterioNome}}</h3></template>
    <template #content>
      <p class="">
        {{props.criterioDescription}}
      </p>
      <div class="inputGroup">
        <div class="radioDiv">
          <RadioButton v-model="criterioNote" inputId="note5" name="1" v-bind:value="1" />
          <label for="note1">1</label>
        </div>
        <div class="radioDiv">
          <RadioButton v-model="criterioNote" inputId="note2" name="2" v-bind:value="2" />
          <label for="note2">2</label>
        </div>
        <div class="radioDiv">
          <RadioButton v-model="criterioNote" inputId="note3" name="3" v-bind:value="3" />
          <label for="note3">3</label>
        </div>
        <div class="radioDiv">
          <RadioButton v-model="criterioNote" inputId="note4" name="4" v-bind:value="4" />
          <label for="note4">4</label>
        </div>
        <div class="radioDiv">
          <RadioButton  v-model="criterioNote" inputId="note5" name="5" v-bind:value="5" />
          <label for="note5">5</label>
        </div>
      </div>
      <div>
        <h4>Justificativa:</h4>
        <Textarea class="textarea" v-model="justify"  rows="5" cols="49"/>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton';
import Textarea from 'primevue/textarea';
import {useAwnserOneStore } from '../../stores/awnserOne.ts'
import { ref, watch } from 'vue'
import { useAwnserTwoStore } from '@/stores/awnserTwo.ts';

const props = defineProps<{
  criterioNumber: number,
  criterioNome: string,
  criterioDescription: string,
  awnserNumber: number,
}>();

const awnserOne = useAwnserOneStore()
const awnserTwo = useAwnserTwoStore()


const criterioNote = ref(awnserOne.getPotuationByNumber(props.criterioNumber))
const justify = ref(awnserOne.getJustifyByNumber(props.criterioNumber));

watch(criterioNote, (newNote)=>{
  if (props.awnserNumber === 1) {
  awnserOne.setPotuationByNumber(props.criterioNumber, newNote)
  }else if (props.awnserNumber ===2) {
  awnserTwo.setPotuationByNumber(props.criterioNumber, newNote)
  }
})

watch(justify, (newJustify)=>{
  if (props.awnserNumber === 1) {
    awnserOne.setJustifyByNumber(props.criterioNumber, newJustify)
  }else if (props.awnserNumber ===2) {
    awnserTwo.setJustifyByNumber(props.criterioNumber, newJustify)
  }
})

</script>

<style scoped>
.card{
  width: 32rem;
  min-height: 27rem;
  margin: 1rem;
  border-radius: 1rem;
  box-shadow:2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  padding: 0.2rem;
}

.inputGroup{
  display: flex;
  flex-wrap: wrap;
  gap:3.5rem;
}
.radioDiv{
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 0.2rem;
}
.textarea{
  background-color: #D9D9D9;
  width: 29rem;
  max-width: 30rem;
}
.cardtitle{
margin-top: 0;
margin-bottom: 0;
}
</style>
