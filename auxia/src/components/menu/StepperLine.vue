<template>
  <Stepper class="stepper" :linear="true" :value="currentStep">
    <StepList>
      <Step
        v-for="step in steps"
        :key="step.value"
        :value="step.value"
        class="stepTitle"
      >
        {{ step.label }}
      </Step>
    </StepList>
  </Stepper>
</template>

<script setup lang="ts">
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import Step from 'primevue/step';



const props = defineProps<{ currentStep: number }>();

const steps = [
    { value: 1, label: 'Pergunta' },
    { value: 2, label: 'Avaliação 1' },
    { value: 3, label: 'Avaliação 2' },
    { value: 4, label: 'Escolha Final' },
    { value: 5, label: 'Concluído' },
  ]

</script>

<style scoped>
.stepper {
  width: 1200px;
  color: #fff !important;
}

.stepTitle {
  font-size: 17px;
  font-weight: bold;
  color: #fff !important;
}
/* mantém seu tema para cores, tamanhos e etc */
.p-stepper-number{
  color: #fff !important;
  --p-stepper-step-number-active-color: #fff !important;
}
.p-stepper {
  --p-stepper-step-title-color: white;
  --p-stepper-step-title-active-color: white;
  --p-stepper-step-title-font-size: 200px;

  --p-stepper-step-number-color: white;
  --p-stepper-step-number-background: black;
  --p-stepper-step-number-border-color: black;

  --p-stepper-step-number-active-color: #fff !important;
  --p-stepper-step-number-active-background: #01CF68;
  --p-stepper-step-number-active-border-color: #01CF68;
  --p-stepper-step-number-size: 32px;

  --p-stepper-separator-background: black;
  --p-stepper-separator-active-background: #01CF68;
  --p-stepper-separator-size: 3px;
}
</style>

