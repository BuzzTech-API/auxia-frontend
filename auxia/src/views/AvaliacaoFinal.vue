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

        <div>
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

  <div class="container1">

   
    

         <div class="cards">
          <div >
            <p class="titulo">Respostas</p>
          </div>
          
          <div class="card1">
            <BoxRespostaCriterioFinal :resposta="awnserOne.ans_llm_awnser" :awnser-number="1" :criterios="[
              { numero: 1, descricao: 'A resposta atende à intenção do usuário e está diretamente relacionada ao prompt fornecido?', criterio: 'Relevância da Resposta', nota: awnserOne.ans_relevancia_resposta_pontuation },
              { numero: 2, descricao: 'A resposta é bem estruturada, gramaticalmente correta e de fácil compreensão?', criterio: 'Coerência e Clareza', nota: awnserOne.ans_coerencia_clareza_pontuation },
              { numero: 3, descricao: 'As informações apresentadas são corretas e baseadas em fontes confiáveis?', criterio: 'Exatidão e Confiabilidade (Veracidade da Resposta)', nota: awnserOne.ans_exatidao_confiabilidade_pontuation },
              { numero: 4, descricao: 'A resposta fornece explicações ou justificativas adequadas para embasar seu conteúdo?', criterio: 'Exposição e Justificativa', nota: awnserOne.ans_exposicao_justificativa_pontuation },
              { numero: 5, descricao: 'O modelo seguiu exatamente as instruções fornecidas no prompt? Se houve alguma falha, qual foi?', criterio: 'Seguiu as Instruções?', nota: awnserOne.ans_seguiu_instrucoes_pontuation },
              { numero: 6, descricao: 'A resposta foi gerada no idioma correto, conforme solicitado no prompt?', criterio: 'Idioma da Resposta é o Mesmo da Pergunta', nota: awnserOne.ans_idioma_pergunta_mesmo_resposta_pontuation },
              { numero: 7, descricao: 'A resposta contém linguagem inadequada, ofensiva, preconceituosa ou potencialmente prejudicial?', criterio: 'Resposta Agressiva ou Ofensiva?', nota: awnserOne.ans_resposta_agressiva_ofensiva_pontuation }
            ]" />

          </div>

          <div class="card2">
            <BoxRespostaCriterioFinal :resposta="awnserTwo.ans_llm_awnser" :awnser-number="2" :criterios="[
              { numero: 1, descricao: 'A resposta atende à intenção do usuário e está diretamente relacionada ao prompt fornecido?', criterio: 'Relevância da Resposta', nota: awnserTwo.ans_relevancia_resposta_pontuation },
              { numero: 2, descricao: 'A resposta é bem estruturada, gramaticalmente correta e de fácil compreensão?', criterio: 'Coerência e Clareza', nota: awnserTwo.ans_coerencia_clareza_pontuation },
              { numero: 3, descricao: 'As informações apresentadas são corretas e baseadas em fontes confiáveis?', criterio: 'Exatidão e Confiabilidade (Veracidade da Resposta)', nota: awnserTwo.ans_exatidao_confiabilidade_pontuation },
              { numero: 4, descricao: 'A resposta fornece explicações ou justificativas adequadas para embasar seu conteúdo?', criterio: 'Exposição e Justificativa', nota: awnserTwo.ans_exposicao_justificativa_pontuation },
              { numero: 5, descricao: 'O modelo seguiu exatamente as instruções fornecidas no prompt? Se houve alguma falha, qual foi?', criterio: 'Seguiu as Instruções?', nota: awnserTwo.ans_seguiu_instrucoes_pontuation },
              { numero: 6, descricao: 'A resposta foi gerada no idioma correto, conforme solicitado no prompt?', criterio: 'Idioma da Resposta é o Mesmo da Pergunta', nota: awnserTwo.ans_idioma_pergunta_mesmo_resposta_pontuation },
              { numero: 7, descricao: 'A resposta contém linguagem inadequada, ofensiva, preconceituosa ou potencialmente prejudicial?', criterio: 'Resposta Agressiva ou Ofensiva?', nota: awnserTwo.ans_resposta_agressiva_ofensiva_pontuation }
            ]" />

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




  <!-- <style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.container1{
  display: flex;
  flex-direction: row;
}

.container2{
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* .containerRespostas{
  display: flex;
  flex-direction: column;
} */

.header {
  display: flex;
  flex-direction: column;
  align-items: center;  
  position: relative;
  width: 100%;
}

.menuUser{
  align-items: center;
  width: 100%;

}

.btnAndStepper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  width: 100%;
  position: relative;
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
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  gap: 1rem;
}

.card1{
min-width: 34rem ;
border-radius: 10px;
}

.card2{
min-width: 34rem ;
border-radius: 10px;
}

.rodape {
  display: flex;
  flex-direction: row;
  justify-items: end;
  align-items: flex-end;
  padding: 3rem;
}

.btn-confirmar {
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
</style>   -->


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
  flex: 1; /* garante que o container1 ocupe o espaço disponível */
  padding: 5rem;
}

.cards {
  flex: 1; /* Ajustado de 2 para 1 para ocupar mesmo espaço que container2 */
  display: flex;
  flex-direction: column;
}

.card1, .card2 {
  width: 100%; /* Ajustado para preencher todo o espaço */
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.container2 {
  flex: 1; /* Ajustado para ocupar o mesmo espaço que cards */
  display: flex;
  flex-direction: column;
}

.prompt1 {
  padding: 16px;
  border-radius: 8px;
  width: 100%; /* Ajustado para ocupar todo o espaço */
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
  display: flex; /* ← necessário para usar justify-content */
  justify-content: flex-end; /* ← coloca o conteúdo no canto direito */
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


</style>
