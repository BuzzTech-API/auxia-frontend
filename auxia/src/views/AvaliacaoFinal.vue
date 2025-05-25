<script setup lang="ts">
import BoxAvaliacaoJustificativaFinal from '@/components/boxes/BoxAvaliacaoJustificativaFinal.vue';
import BoxRespostaCriterioFinal from '@/components/boxes/BoxRespostaCriterioFinal.vue';
import BtnConfirmarEscolha from '@/components/buttons/BtnConfirmarEscolha.vue';
import BtnVoltar from '@/components/buttons/BtnVoltar.vue';
import { useAwnserOneStore } from '@/stores/awnserOne';
import { useAwnserTwoStore } from '@/stores/awnserTwo';
import { useRouter } from 'vue-router';

const router = useRouter();

const voltar = () => {
  router.go(-1);
};


const awnserOne = useAwnserOneStore();
const awnserTwo = useAwnserTwoStore();



</script>



<template>
  <div class="container">
    <div class="header">
      <div class="btn">
        <BtnVoltar @click="voltar" />
      </div>

      <div class="prompt1">
        <p>Prompt</p>
        <div class="prompt2">
          <p>{{ awnserOne.ans_prompt }}</p>
        </div>
      </div>
    </div>

    <div class="cards">
      <div class="card1">
        <BoxRespostaCriterioFinal :resposta="awnserOne.ans_llm_answer" :awnser-number="1" :criterios="[
  { numero: 1, nota: awnserOne.getPontuationByNumber(1), descricao: 'A resposta está diretamente relacionada à intenção do usuário? O modelo compreendeu corretamente as instruções do prompt e respondeu de forma pertinente, sem fugir do tema ou omitir comandos importantes?', criterioNome: 'Aderência ao Prompt' },
  { numero: 2,nota: awnserOne.getPontuationByNumber(2), descricao: 'A resposta é bem estruturada, gramaticalmente correta e de fácil compreensão?', criterioNome: 'Coerência e Clareza' },
  { numero: 3, nota: awnserOne.getPontuationByNumber(3), descricao: 'As informações apresentadas são corretas e baseadas em fontes confiáveis?', criterioNome: 'Exatidão e Confiabilidade (Veracidade da Resposta)' },
  { numero: 4, nota: awnserOne.getPontuationByNumber(4), descricao: 'A resposta fornece explicações ou justificativas adequadas para embasar seu conteúdo?', criterioNome: 'Exposição e Justificativa' },
  { numero: 5, nota: awnserOne.getPontuationByNumber(5), descricao: 'A resposta foi gerada no idioma correto, conforme solicitado no prompt?', criterioNome: 'Idioma da Resposta é o Mesmo da Pergunta' },
  { numero: 6, nota: awnserOne.getPontuationByNumber(6), descricao: 'A resposta contém linguagem inadequada, ofensiva, preconceituosa ou potencialmente prejudicial?', criterioNome: 'Resposta Agressiva ou Ofensiva?' },
]" />

      </div>

      <div class="card2">
        <BoxRespostaCriterioFinal :resposta="awnserTwo.ans_llm_answer" :awnser-number="2" :criterios="[
  { numero: 1, nota: awnserTwo.getPontuationByNumber(1), descricao: 'A resposta está diretamente relacionada à intenção do usuário? O modelo compreendeu corretamente as instruções do prompt e respondeu de forma pertinente, sem fugir do tema ou omitir comandos importantes?', criterioNome: 'Aderência ao Prompt' },
  { numero: 2, nota: awnserTwo.getPontuationByNumber(2), descricao: 'A resposta é bem estruturada, gramaticalmente correta e de fácil compreensão?', criterioNome: 'Coerência e Clareza' },
  { numero: 3, nota: awnserTwo.getPontuationByNumber(3), descricao: 'As informações apresentadas são corretas e baseadas em fontes confiáveis?', criterioNome: 'Exatidão e Confiabilidade (Veracidade da Resposta)' },
  { numero: 4, nota: awnserTwo.getPontuationByNumber(4), descricao: 'A resposta fornece explicações ou justificativas adequadas para embasar seu conteúdo?', criterioNome: 'Exposição e Justificativa' },
  { numero: 5, nota: awnserTwo.getPontuationByNumber(5), descricao: 'A resposta foi gerada no idioma correto, conforme solicitado no prompt?', criterioNome: 'Idioma da Resposta é o Mesmo da Pergunta' },
  { numero: 6, nota: awnserTwo.getPontuationByNumber(6), descricao: 'A resposta contém linguagem inadequada, ofensiva, preconceituosa ou potencialmente prejudicial?', criterioNome: 'Resposta Agressiva ou Ofensiva?' },
]" />

      </div>
    </div>

    <div class="rodape">
      <BoxAvaliacaoJustificativaFinal />
      <BtnConfirmarEscolha @click="router.push('/')"/>
    </div>
  </div>

</template>




<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  justify-content: space-around;
  margin-left: 12%;
  margin-right: 25%;
  /* margin-right: 28%;
gap: 20%; */
}

.btn {
  margin-bottom: 5rem;

}

.prompt1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;


}

.prompt2 {
  display: flex;
  flex-direction: column;
  background-color: #d9d9d9;
  padding: 5px 5px 5px 5px;
  border-radius: 10px;
  min-width: 40rem;
  min-height: 7rem;
  color: black;

}

.cards {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  gap: 1rem;
}

/* .card1{
min-width: 30rem ;
min-height: 27rem;
background-color: #d9d9d9;
border-radius: 10px;
} */

/* .card2{
min-width: 30rem ;
min-height: 27rem;
background-color: #d9d9d9;
border-radius: 10px;
} */

.rodape {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 3rem;
  gap: 1rem;
}

.btn-confirmar {
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
</style>
