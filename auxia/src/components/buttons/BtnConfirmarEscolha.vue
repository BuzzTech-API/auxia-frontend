<script setup lang="ts">
import { computed } from 'vue';
import { useAwnserOneStore } from '@/stores/awnserOne';
import { useAwnserTwoStore } from '@/stores/awnserTwo';
import { ref, watch } from 'vue';
import ModalRespostaIncoerente from '../modais/ModalRespostaIncoerente.vue';
import Dialog from 'primevue/dialog';
import BtnVoltarModal from '@/components/buttons/BtnVoltarModal.vue';
import Toast from 'primevue/toast';
import { marked } from 'marked';
import { useToast } from 'primevue/usetoast';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';



const awnserOne = useAwnserOneStore();
const awnserTwo = useAwnserTwoStore();
const userStore = useUserStore()

const router = useRouter()
const visible = ref(false);
const showModal = ref(false)
const isIncoerente = ref(false);
const isOpen = ref(false);
const toast = useToast()


function confirmarEscolha() {
  showModal.value = false;
  if (isIncoerente.value === true) {

  } else {
    sendAwnsers();
  }
}

const preferencia = computed({
  get: () => awnserOne.ans_prefered_answer,
  set: (val) => {
    awnserOne.ans_prefered_answer = val;
    awnserTwo.ans_prefered_answer = val;
  }
});

const preferenciaResposta = computed(() => {
  if (preferencia.value?.includes('LLM1')) {
    return awnserOne.ans_llm_answer;
  } else if (preferencia.value?.includes('LLM2')) {
    return awnserTwo.ans_llm_answer;
  } else {
    return '';
  }
});

const preferenciaRespostaHTML = computed(() => marked.parse(preferenciaResposta.value || ''));


const isEmpty = ref(!(awnserOne.ans_prefered_answer.length > 0 &&
  awnserOne.ans_prefered_answer_justify.length > 0 && awnserTwo.ans_prefered_answer.length > 0 &&
  awnserTwo.ans_prefered_answer_justify.length > 0));



watch(awnserOne, () => {
  isEmpty.value = !(awnserOne.ans_prefered_answer.length > 0 &&
    awnserOne.ans_prefered_answer_justify.length > 0 && awnserTwo.ans_prefered_answer.length > 0 &&
    awnserTwo.ans_prefered_answer_justify.length > 0)
  if (awnserOne.totalPontuation > awnserTwo.totalPontuation) {
    if (awnserOne.ans_prefered_answer === "Prefere muito a resposta da LLM1" || awnserOne.ans_prefered_answer === "Prefere a resposta da LLM1") {
      isIncoerente.value = false;
      return;
    }
  }

  if (awnserOne.totalPontuation === awnserTwo.totalPontuation) {
    isIncoerente.value = false;
    return;
  }

  if (awnserOne.totalPontuation < awnserTwo.totalPontuation) {
    if (awnserOne.ans_prefered_answer === "Prefere muito a resposta da LLM2" || awnserOne.ans_prefered_answer === "Prefere a resposta da LLM2") {
      isIncoerente.value = false;
      return;
    }
  }

  isIncoerente.value = true;
});

const handleClick = () => {
  if (!isEmpty.value && !isIncoerente.value) {
    showModal.value = true
  } else {
    isOpen.value = true
  }
};



async function sendAwnsers() {
  await userStore.getMe()
  awnserTwo.usr_email = userStore.usr_email
  awnserOne.usr_email = userStore.usr_email

  const responseOne = await awnserOne.registerAnswer()
  if (responseOne) {
    awnserOne.$reset()
    awnserTwo.$reset()
    //Toast de Sucesso
    toast.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Avaliação enviada com sucesso!',
      life: 3000
    })
    setTimeout(() => {
      router.push("/conclusao")
    }, 3000)
  } else {
    //Toast de falha
    toast.add({
      severity: 'error',
      summary: 'Falha!',
      detail: 'Falha no envio da avaliação!',
      life: 3000
    })
    visible.value = true
  }

}

const close = () => {
  isOpen.value = false;
};


</script>

<template>
  <Toast position="top-center" />
  <div>
    <button class="confirm-button" id="confirmation-button" :class="{ 'disabled': isEmpty }" :disabled="isEmpty"
      @click="handleClick">
      <p class="texto"> Salvar Feedback </p>
    </button>
  </div>

  <ModalRespostaIncoerente :open="isOpen" @click="close" titulo="ATENÇÃO"
    message="Sua resposta está incoerrente com sua avaliação, deseja prosseguir mesmo assim?" />

  <!-- Modal de erro -->
  <Dialog v-model:visible="visible" modal header="Erro no envio das avaliações" :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <p class="m-0">
      Ocorreu um erro ao enviar as suas avaliações, por favor tente novamente!
    </p>
  </Dialog>

  <!-- Modal de confirmação -->
  <Dialog class="dialog" v-model:visible="showModal" header="Confirmação" modal>
    <p>Tem certeza que deseja enviar sua avaliação?</p>
    <p><strong>Resposta escolhida:</strong></p>
    <div v-html="preferenciaRespostaHTML" />
    <p><strong>Justificativa:</strong> {{ awnserOne.ans_prefered_answer_justify }}</p>

    <template #footer>
      <BtnVoltarModal @click="showModal = false" class="btn-cancelar" />
      <button class="confirm-button" id="confirmation-button" :class="{ 'disabled': isEmpty }" :disabled="isEmpty"
        @click="confirmarEscolha">
        <p class="texto"> Confirmar Escolha </p>
      </button>
    </template>
  </Dialog>

</template>

<style scoped>
.confirm-button {
  margin-top: 1.5rem;
  margin-left: -1rem;
  padding: 0.5rem 2rem;
  font-size: 1rem;
  background-color: #01CF68;
  color: rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  border-radius: 7px;
  transition: background-color 0.3s;
  display: flex;
  width: 200px;
  height: 45px;
  align-items: center;
  justify-content: center;
  color: rgb(255, 255, 255);
  border: none;
}

.confirm-button:hover {
  background-color: #019B50;
  transition: 300ms;
  transition-delay: 50ms;
}

.confirm-button.disabled {
  background-color: #A3D7C3;
  cursor: not-allowed;

}

.texto {
  font-size: 15px;
}

.pi-arrow-right {
  font-size: 24px;
}

.btn-cancelar {
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
}

.dialog {
  max-width: 40rem !important;
}
</style>
