<script setup lang="ts">
import { defineEmits } from 'vue';
import { useAwnserOneStore } from '@/stores/awnserOne';
import { useAwnserTwoStore } from '@/stores/awnserTwo';
import { ref, watch } from 'vue';


const emit = defineEmits(["click"]);
const awnserOne = useAwnserOneStore();
const awnserTwo = useAwnserTwoStore();

const isEmpty = ref(!(awnserOne.ans_prefered_answer.length > 0 &&
  awnserOne.ans_prefered_answer_justify.length > 0 && awnserTwo.ans_prefered_answer.length > 0 &&
  awnserTwo.ans_prefered_answer_justify.length > 0 ))

const isIncoerente = ref(false)

watch(awnserOne, () => {
  isEmpty.value = !(awnserOne.ans_prefered_answer.length > 0 &&
    awnserOne.ans_prefered_answer_justify.length > 0 && awnserTwo.ans_prefered_answer.length > 0 &&
    awnserTwo.ans_prefered_answer_justify.length > 0 )  
  if (awnserOne.potuantionTotal > awnserTwo.potuantionTotal) {
    if (awnserOne.ans_prefered_answer === "Prefere muito a resposta da LLM1" || awnserOne.ans_prefered_answer ===  "Prefere a resposta da LLM1") {
      isIncoerente.value = false
      return
    }
  }
  if (awnserOne.potuantionTotal === awnserTwo.potuantionTotal) {
    if (awnserOne.ans_prefered_answer === "Sem preferência de resposta") {
      isIncoerente.value = false
      return
    }
  }
  if (awnserOne.potuantionTotal < awnserTwo.potuantionTotal) {
    if (awnserOne.ans_prefered_answer === "Prefere muito a resposta da LLM2" || awnserOne.ans_prefered_answer ===  "Prefere a resposta da LLM2") {
      isIncoerente.value = false
      return
    }
  }
  //isIncoerente.value = true
}); 



</script>

<template>
  <div>
    <button class="confirm-button"
      id="confirmation-button"
      :class="{'disabled': isEmpty || isIncoerente}"
      :disabled="isEmpty || isIncoerente"
      @click="emit('click')">
      <p class="texto"> Confirmar Escolha </p>
    </button>
  </div>
</template>

<style scoped>
.confirm-button {
  margin-top: 1.0rem;
  margin-left: -1rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background-color: #d9d9d9;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  transition: background-color 0.3s;
  display: flex;
  width: 160px;
  height: 45px;
  align-items: center;
  justify-content: center;
  color: black;
  border: none;
}

.confirm-button:hover {
  background-color: #7B7B7B;
  transition: 300ms;
  transition-delay: 50ms;
}

.confirm-button.disabled {
  background-color: #A0A0A0;
  cursor: not-allowed;

}

.texto {
  font-size: 15px;
}

.pi-arrow-right{
  font-size: 24px;
}
</style>
