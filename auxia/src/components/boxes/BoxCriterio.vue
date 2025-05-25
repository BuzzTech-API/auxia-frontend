<template>
   <!-- <Card class="card">
    <template #title>

      <i
          :class="[
            'ml-2 pi',
            isRespondido ? 'pi-verified text-green-500' : 'pi-exclamation-circle text-yellow-500'
          ]"
        ></i>

      <h3 class="cardtitle">Critério {{props.criterioNome}}</h3>
    </template>
    <template #content>
      <p class="">
        {{props.criterioDescription}}
      </p>
      <div class="inputGroup">
        <div class="radioDiv">
          <RadioButton v-model="criterioNote" inputId="note1" name="1" v-bind:value="1" />
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
  </Card>   -->


  <Accordion  :activeIndex="0" >
    <AccordionPanel class="!border-transparent" value="painel1">
    <AccordionHeader class="acordionHeader">
      <i
          :class="[
            'ml-2 pi',
            isRespondido ? 'pi-verified' : 'pi-exclamation-circle'
          ]"
          :style="{ fontSize: '2.5rem', color: isRespondido ? '#10b981' : '#ef4444' }"

        ></i>

      <h3 class="cardtitle">Critério {{props.criterioNome}}</h3>
    </AccordionHeader>
    <AccordionContent class="acordionContent">
      <p class="desc">
        {{props.criterioDescription}}
      </p>
      <div class="inputGroup">
        <div class="radioDiv">
          <RadioButton v-model="criterioNote" inputId="note1" name="1" v-bind:value="1" />
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
    </AccordionContent>
  </AccordionPanel>
</Accordion>





</template>
<script setup lang="ts">
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton';
import Textarea from 'primevue/textarea';
import {useAwnserOneStore } from '../../stores/awnserOne.ts'
import { ref, watch, computed } from 'vue'
import { useAwnserTwoStore } from '@/stores/awnserTwo.ts';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

const props = defineProps<{
  criterioNumber: number,
  criterioNome: string,
  criterioDescription: string,
  awnserNumber: number,
}>();

const awnserOne = useAwnserOneStore()
const awnserTwo = useAwnserTwoStore()

const isRespondido = computed(() => {
  return criterioNote.value !== null && justify.value.trim().length > 0;
});


const criterioNote = ref(props.awnserNumber === 1 ? awnserOne.getPontuationByNumber(props.criterioNumber): awnserTwo.getPontuationByNumber(props.criterioNumber));
const justify = ref(props.awnserNumber === 1 ? awnserOne.getJustifyByNumber(props.criterioNumber): awnserTwo.getJustifyByNumber(props.criterioNumber));

watch(criterioNote, (newNote)=>{
  if (props.awnserNumber === 1) {
  awnserOne.setPontuationByNumber(props.criterioNumber, newNote)
  }else if (props.awnserNumber ===2) {
  awnserTwo.setPontuationByNumber(props.criterioNumber, newNote)
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
.desc {
  display: flex;
  justify-content: center;
}
.inputGroup{
  display: flex;
  flex-wrap: wrap;
  gap:3.5rem;
  margin-top: 15px;
  margin-bottom: 15px;
  justify-content: center;
}
.radioDiv{
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 0.2rem;
}
.textarea{
  background-color: #7B7B7B;
  width: 39vw;
  border-color: black;
  color: white;
}
.cardtitle{
margin-top: 0;
margin-bottom: 0;
color: white;
padding-right: 2vw;
}

.acordionHeader{
  background-color: #363636;
  --p-accordion-header-background: #363636;
  --p-accordion-header-hover-background: #363636;
  --p-accordion-header-active-background: #363636;
  --p-accordion-header-active-hover-background: #363636;
  --p-accordion-header-focus-ring-color: #363636;
  gap: 1rem;
}

.acordionContent{
  background-color: #363636;
  --p-accordion-content-background: #363636;
  --p-accordion-content-color:  white;
  --p-accordion-content-border-color: #363636;
  --p-accordion-content-border-width: 1px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}



</style>
