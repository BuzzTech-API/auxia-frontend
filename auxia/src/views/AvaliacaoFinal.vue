<script setup lang="ts">
import BoxAvaliacaoJustificativaFinal from '@/components/boxes/BoxAvaliacaoJustificativaFinal.vue';
import BoxRespostaCriterioFinal from '@/components/boxes/BoxRespostaCriterioFinal.vue';
import BtnConfirmarEscolha from '@/components/buttons/BtnConfirmarEscolha.vue';
import BtnVoltar from '@/components/buttons/BtnVoltar.vue';
import { useAwnserOneStore } from '@/stores/awnserOne';
import { useAwnserTwoStore } from '@/stores/awnserTwo';
import { useRouter } from 'vue-router';
 import StepperLine from '@/components/menu/StepperLine.vue';
 import MenuUser from '@/components/menu/MenuUser.vue';

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
      <div class="menuUser">
        <MenuUser />
      </div>

      <div class="btnAndStepper">

        <div class="btnVoltar">
          <BtnVoltar @click="voltar" />
        </div>
        <div class="stepper">
          <StepperLine currentStep="4" />
        </div>

        <div class="ajuda">
            <i class="pi pi-question-circle" style="color: #B5B5B5" />
          </div>
      </div>
  </div>


    <div class="body">   

    <div class="container1">

         <div class="cards">
          <div >
            <p class="titulo">Respostas</p>
          </div>
          
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

    </div>

    <div class="container2">

       <div class="prompt1">
          <div >
            <p class="titulo">Prompt</p>
          </div>
        
          <div class="prompt2">
            <p>{{ awnserOne.ans_prompt }}</p>
          </div>
        </div>

        <div >
          <BoxAvaliacaoJustificativaFinal />
        </div>
    
    <div class="rodape">
      <BtnConfirmarEscolha />
    </div>


    </div>

    </div>

  </div>

</template>


 <style scoped>
.container {
  display: flex;
  flex-direction: column;
  color: #fff;
  min-height: 100vh;
  min-width: 100%;
  background-color: #4B4B4B;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.menuUser{
  min-width: 100%;
}

.container1 {
  display: flex;
  gap: 5rem;
  margin-top: 10px;
  flex: 1; 
  padding: 2rem;
  margin-top: 2rem;
}

.body{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  min-width: 100%;
}

.cards {
  flex: 1;
  flex-direction: column;
}

.card1, .card2 {
  width: 100%; 
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.container2 {
  flex: 1; 
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 1.5rem;
}

.prompt1 {
  padding: 16px;
  border-radius: 8px;
  width: 100%; 
}

.prompt2 {
  margin-top: 10px;
  background-color: #363636;
  color: #ffffff;
  padding: 1rem;
  border-radius: 1rem; 
  width: 101%;
}

.rodape {
  margin-top: auto;
  display: flex; 
  justify-content: flex-end; 
  margin-right: 0.6rem;
}

.btnAndStepper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:center;
  margin-top: 1rem;

}

.stepper{
  max-width: 90%;
  margin-top: 0.5rem;
  margin-left: 1.3rem;
}

.ajuda{
  margin-top: 1.2rem;
} 

.titulo {
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.btnVoltar{
  margin-top: 1rem;
}

</style>
