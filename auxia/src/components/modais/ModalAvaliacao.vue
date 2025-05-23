<script setup lang="ts">
import { computed, defineProps } from 'vue'
import BoxResposta from '@/components/boxes/BoxRespostaModal.vue'
import BoxAvaliacao from '@/components/boxes/BoxCriterio.vue'
import BtnConfirmarAvaliacao from '../buttons/BtnConfirmarAvaliacao.vue';
import BtnVoltar from '../buttons/BtnVoltar.vue';
import { useAwnserOneStore } from '@/stores/awnserOne.ts'
import { useAwnserTwoStore } from '@/stores/awnserTwo.ts';
const emit = defineEmits(['close']);


const props = defineProps<{ isVisible: boolean, awnserNumber: number }>();

// const respostaTexto = `Aqui vai a resposta completa do usuário...`;

const awnserOne = useAwnserOneStore()
const awnserTwo = useAwnserTwoStore()

const respostaTexto = computed(() => {
  if (props.awnserNumber === 1) {
    return awnserOne.ans_llm_answer;
  } else if (props.awnserNumber === 2) {
    return awnserTwo.ans_llm_answer;
  }
  return '';
});


const criterios = [
  { numero: 1, awnserNumber: props.awnserNumber, descricao: 'A resposta está diretamente relacionada à intenção do usuário? O modelo compreendeu corretamente as instruções do prompt e respondeu de forma pertinente, sem fugir do tema ou omitir comandos importantes?', criterioNome: 'Aderência ao Prompt' },
  { numero: 2, awnserNumber: props.awnserNumber, descricao: 'A resposta é bem estruturada, gramaticalmente correta e de fácil compreensão?', criterioNome: 'Coerência e Clareza' },
  { numero: 3, awnserNumber: props.awnserNumber, descricao: 'As informações apresentadas são corretas e baseadas em fontes confiáveis?', criterioNome: 'Exatidão e Confiabilidade (Veracidade da Resposta)' },
  { numero: 4, awnserNumber: props.awnserNumber, descricao: 'A resposta fornece explicações ou justificativas adequadas para embasar seu conteúdo?', criterioNome: 'Exposição e Justificativa' },
  { numero: 5, awnserNumber: props.awnserNumber, descricao: 'A resposta foi gerada no idioma correto, conforme solicitado no prompt?', criterioNome: 'Idioma da Resposta é o Mesmo da Pergunta' },
  { numero: 6, awnserNumber: props.awnserNumber, descricao: 'A resposta contém linguagem inadequada, ofensiva, preconceituosa ou potencialmente prejudicial?', criterioNome: 'Resposta Agressiva ou Ofensiva?' },
];


</script>

<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-container">

      <div class="header">
        <div>
          <BtnVoltar @click="emit('close')" class="voltar-button" />
        </div>

        <div>
          <h2 class="modal-title">Resposta {{ props.awnserNumber }}</h2>
        </div>

      </div>

      <div class="modal-content">
        <!-- Box de Respostas -->
        <BoxResposta :resposta="respostaTexto" />

        <!-- Box de Criterio -->
        <div class="avaliacao-container">
          <BoxAvaliacao v-for="(criterio, index) in criterios" :key="index" :criterioNumber="criterio.numero"
            :criterioDescription="criterio.descricao" :criterioNome="criterio.criterioNome"
            :awnserNumber="awnserNumber" />

        </div>
      </div>

      <div class="btnConfirmaAvaliacao">
        <BtnConfirmarAvaliacao :hasArrow="false" v-if="awnserNumber === 1"
          :disabled="!awnserOne.allStandardIsJustifyAndPontuated()" @click="emit('close')" />

        <BtnConfirmarAvaliacao :hasArrow="false" v-else-if="awnserNumber === 2"
          :disabled="!awnserTwo.allStandardIsJustifyAndPontuated()" @click="emit('close')" />
      </div>

    </div>
  </div>
</template>
<style scoped>
.voltar-button {
  margin-right: auto;
  top: 1rem;
  left: 1rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: #ffffff;
  padding: 1rem;
  border-radius: 1rem;
  height: 95%;
  width: 100%;
  max-width: 1100px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 4%;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 33%;

}


.modal-content {
  display: flex;
  width: 47rem;
  gap: 1.5rem;
  width: 100%;
  overflow: hidden;
}

.avaliacao-container {
  display: flex;
  width: 47rem;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 75vh;
  overflow-y: auto;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

.btnConfirmaAvaliacao {
  display: contents;
  flex-direction: row;
  justify-content: end;
  align-items: end;
}
</style>
