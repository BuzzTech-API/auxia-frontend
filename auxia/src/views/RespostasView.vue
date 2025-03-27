<script setup lang="ts">
import BoxRespostaIA from '@/components/BoxRespostaIA.vue';
import BtnVoltar from '@/components/buttons/BtnVoltar.vue';
import BtnConfirmarAvaliacao from '@/components/buttons/BtnConfirmarAvaliacao.vue';
</script>

<template>
    <div class="telaFull">
        <div class="respostasView">
            <div class="voltar">
            <BtnVoltar/>
            </div>
            <div class="respostas">
                <BoxRespostaIA class="boxResposta1" llm="LLM 1" resposta="Resposta1"/> 
                <BoxRespostaIA class="boxResposta2" llm="LLM 2" resposta="Resposta2"/>
            </div>
            <div class="confirmar">
                <BtnConfirmarAvaliacao/>
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