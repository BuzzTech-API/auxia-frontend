<script setup lang="ts">
import BoxRespostaIA from '@/components/BoxRespostaIA.vue';
import BtnVoltar from '@/components/buttons/BtnVoltar.vue';
import BtnConfirmarAvaliacao from '@/components/buttons/BtnConfirmarAvaliacao.vue';
import { useAwnserOneStore } from '@/stores/awnserOne';
import { useAwnserTwoStore } from '@/stores/awnserTwo';
import { ref, watch } from 'vue';
import ModalAvaliacao from '@/components/ModalAvaliacao.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';


const awnserOne = useAwnserOneStore()
const awnserTwo = useAwnserTwoStore()


const router = useRouter();

const voltar = () => {
  router.go(-1);
};

const irParaPagina = () => {
  router.push('/avaliacaoFinal'); 
};


const respostaSelecionada = ref<number>(0);
const modalAberto = ref(false);

const abrirModal = (numeroResposta: number) => {
    respostaSelecionada.value = numeroResposta;
    modalAberto.value = true;
};

const fecharModal = () => {
    modalAberto.value = false;
    respostaSelecionada.value = 0;
};

watch(respostaSelecionada, (newValue) => {
    if (newValue === 0) {
        modalAberto.value = false;
    }
});



const toast = useToast()

// Aqui vai ficar o envio da resposta pro backend!
// Coloque o toast de sucesso dentro to "try" para quando a requisição for bem sucedida
// Coloque o toast de falha dentro do "catch" para quando a requisição for mal sucedida.
// Se não for aqui a requisição manda mensagem pro Vitor Lima
// Essa função está sendo chamada no botão de confirmar
const handleConfirm = () => {

    //Toast de Sucesso
    toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Resposta enviada com sucesso!',
        life: 3000
    })

    //Toast de falha 
    toast.add({
        severity: 'error',
        summary: 'Falha!',
        detail: 'Falha no envio da resposta!',
        life: 3000
    })

}
</script>

<template>
    <div class="telaFull">
        <Toast/>

        <div class="respostasView">

            <div class="header">
                <div class="btn">
                    <BtnVoltar @click="voltar"/>
                </div>

                <div>
                    <h2>Clique em cada uma das respostas e as avalie individualmente</h2>
                </div>
            
            </div>
            <div class="respostas">
                <BoxRespostaIA class="boxResposta1" 
                :llm="awnserOne.ans_llm_model" 
                :resposta="awnserOne.ans_llm_awnser"
                @click="abrirModal(1)"/>

                <BoxRespostaIA class="boxResposta2" 
                :llm="awnserTwo.ans_llm_model" 
                :resposta="awnserTwo.ans_llm_awnser"
                @click="abrirModal(2)"/>
            </div>
            <div class="confirmar">
                <BtnConfirmarAvaliacao :disabled="!(awnserOne.allStandardIsJustifyAndPontuated() &&
                awnserTwo.allStandardIsJustifyAndPontuated())" :hasArrow="true"  @click="irParaPagina"/>
            </div>
        </div>
    </div>

    <ModalAvaliacao
  v-if="respostaSelecionada !== null"
  :isVisible="modalAberto" 
  :awnserNumber="respostaSelecionada" 
  @close="fecharModal"
/>



</template>

<style scoped>
.telaFull{
    display: flex;
    justify-content: center;
}
.respostasView{
    width: 70%;
}
.header{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 6%;
    padding-top: 10px;
    margin-right: 23%;
    /* padding-bottom: 15px; */
}
.btn{
    margin-top: 2%;

}
.respostas{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 80px;
    cursor: pointer;
    margin-top: 0.3%;
}
.confirmar{
    display: flex;
    justify-content: flex-end;
    height: 80px;
    padding-top: 20px;
}
</style>
