<script setup lang="ts">
import BoxRespostaIA from '@/components/BoxRespostaIA.vue';
import BtnVoltar from '@/components/buttons/BtnVoltar.vue';
import BtnConfirmarAvaliacao from '@/components/buttons/BtnConfirmarAvaliacao.vue';
import { useAwnserOneStore } from '@/stores/awnserOne';
import { useAwnserTwoStore } from '@/stores/awnserTwo';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';


const awnserOne = useAwnserOneStore()
const awnserTwo = useAwnserTwoStore()
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
            <div class="voltar">
            <BtnVoltar/>
            </div>
            <div class="respostas">
                <BoxRespostaIA class="boxResposta1" llm="LLM 1" resposta="Resposta1"/>
                <BoxRespostaIA class="boxResposta2" llm="LLM 2" resposta="Resposta2"/>
            </div>
            <div class="confirmar">
                <BtnConfirmarAvaliacao :disabled="!(awnserOne.allStandardIsJustifyAndPontuated() &&
                awnserTwo.allStandardIsJustifyAndPontuated())" :hasArrow="true" @click="handleConfirm"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.telaFull{
    display: flex;
    justify-content: center;
}
.respostasView{
    width: 70%;
}
.voltar{
    padding-top: 20px;
    padding-bottom: 15px;
}
.respostas{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 80px;
}
.confirmar{
    display: flex;
    justify-content: flex-end;
    height: 80px;
    padding-top: 20px;
}
</style>
