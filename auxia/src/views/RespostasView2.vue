<script setup lang="ts">
import { computed } from 'vue'
import BoxAvaliacao from '@/components/boxes/BoxCriterio.vue'
import BtnConfirmarAvaliacao from '@/components/buttons/BtnConfirmarAvaliacao.vue';
import BtnVoltar from '@/components/buttons/BtnVoltar.vue';
import { useAwnserTwoStore } from '@/stores/awnserTwo.ts'
import { useRouter } from 'vue-router';
import BoxRespostaIA from '@/components/boxes/BoxRespostaIA.vue';
import MenuUser from '@/components/menu/MenuUser.vue';
import StepperLine from '@/components/menu/StepperLine.vue';

const awnserTwo = useAwnserTwoStore()
const respostaTexto = computed(() => awnserTwo.ans_llm_answer)

const router = useRouter();

const voltar = () => {
  router.go(-1);
};

const irParaPagina = () => {
  return router.push({path : '/avaliacaoFinal'});
};

const criterios = [
  { numero: 1, awnserNumber: 2, descricao: 'A resposta está diretamente relacionada à intenção do usuário? O modelo compreendeu corretamente as instruções do prompt e respondeu de forma pertinente, sem fugir do tema ou omitir comandos importantes?', criterioNome: 'Aderência ao Prompt' },
  { numero: 2, awnserNumber: 2, descricao: 'A resposta é bem estruturada, gramaticalmente correta e de fácil compreensão?', criterioNome: 'Coerência e Clareza' },
  { numero: 3, awnserNumber: 2, descricao: 'As informações apresentadas são corretas e baseadas em fontes confiáveis?', criterioNome: 'Exatidão e Confiabilidade (Veracidade da Resposta)' },
  { numero: 4, awnserNumber: 2, descricao: 'A resposta fornece explicações ou justificativas adequadas para embasar seu conteúdo?', criterioNome: 'Exposição e Justificativa' },
  { numero: 5, awnserNumber: 2, descricao: 'A resposta foi gerada no idioma correto, conforme solicitado no prompt?', criterioNome: 'Idioma da Resposta é o Mesmo da Pergunta' },
  { numero: 6, awnserNumber: 2, descricao: 'A resposta contém linguagem inadequada, ofensiva, preconceituosa ou potencialmente prejudicial?', criterioNome: 'Resposta Agressiva ou Ofensiva?' },
];

const isReadyToSubmit = computed(() => awnserTwo.allStandardIsJustifyAndPontuated())

</script>

<template>
<div class="all">
    <MenuUser />
  <div class="page-container">
    <div class="header">
      <BtnVoltar class="voltar-button" @click="voltar"/>
      <StepperLine :currentStep="3"/>
    </div>
    <div class="content">
        <div class="resposta">
            <BoxRespostaIA :llm="2" :resposta="respostaTexto" />
            <!-- <BoxResposta :resposta="respostaTexto" /> -->
        </div>
        <div class="resp">
            <h2 class="title">Resposta 2</h2>
            <div class="avaliacao">
                <BoxAvaliacao
                v-for="(criterio, index) in criterios"
                :key="index"
                :criterioNumber="criterio.numero"
                :criterioDescription="criterio.descricao"
                :criterioNome="criterio.criterioNome"
                :awnserNumber="criterio.awnserNumber"
                />
            </div>
        </div>
    </div>
  </div>
  <div class="btnConfirmaAvaliacao">
        <BtnConfirmarAvaliacao :hasArrow="false" :disabled="!isReadyToSubmit" @click="irParaPagina" />
  </div>
</div>
</template>

<style scoped>
.all {
    background-color: #4B4B4B;
    height: 100vh;
}
.page-container {
  padding: 0.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.header {
  display: flex;
  justify-content: center;
  gap: 5rem;
  width: 100%;
  padding-right: 2vw;
}
.content {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 0.3%;
  width: 70vw;
  gap: 2rem;
}
.resposta {
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  gap: 80px;
}
.title {
  font-size: 2.3rem;
  font-weight: 600;
  padding-bottom: 10px;
  color: white;

}
.avaliacao {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 75vh;
  width: 42vw;
  height: 65vh;
  overflow-y: auto;
}
.btnConfirmaAvaliacao {
  display: flex;
  justify-content: flex-end;
  padding-right: 12vw;
}
</style>
