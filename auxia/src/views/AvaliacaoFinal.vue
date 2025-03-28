<script setup lang="ts">
import BoxAvaliacaoJustificativaFinal from '@/components/boxes/BoxAvaliacaoJustificativaFinal.vue';
import BtnConfirmarEscolha from '@/components/buttons/BtnConfirmarEscolha.vue';
import BtnVoltar from '@/components/buttons/BtnVoltar.vue';
import { useAwnserOneStore } from '@/stores/awnserOne';
import { useAwnserTwoStore } from '@/stores/awnserTwo';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const voltar = () => {
  router.go(-1);
};

const awnserOne = useAwnserOneStore()
const awnserTwo = useAwnserTwoStore()




</script>

<template>
    <div class="container">
        <div class="header">

            <div class="btn">
                <BtnVoltar @click="voltar"/>
            </div>

            <div class="prompt1">

                <p>Prompt</p>
                <div class="prompt2">
                    <p>{{awnserOne.ans_prompt }}</p>
                </div>

            </div>

        </div>

        <div class="cards">
            <div class="card1">card</div>
            <div class="card2">card</div>
        </div>

        <div class="rodape">
            <BoxAvaliacaoJustificativaFinal/>
            <BtnConfirmarEscolha/>

        </div>
    </div>

</template>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
}

.header{
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

.btn{
    margin-bottom: 5rem;

}
.prompt1{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
   

}

.prompt2{
    display: flex;
    flex-direction: column;
    background-color: #d9d9d9;
    padding: 5px 5px 5px 5px;
    border-radius: 10px;
    min-width: 40rem;
    min-height: 7rem;
    color: black;

}

.cards{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    gap: 5rem;
}

.card1{
    min-width: 30rem ;
    min-height: 27rem;
    background-color: #d9d9d9;
    border-radius: 10px;
}

.card2{
    min-width: 30rem ;
    min-height: 27rem;
    background-color: #d9d9d9;
    border-radius: 10px;
}

.rodape{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 3rem;
    gap: 1rem;
}



</style>