<template>
    <!--Quando for chamar o Stepper, colocar o numero do currentStep equivalente a etapa da tela-->
    <Stepper class="stepper" :linear="true" :value="currentStep">
        <StepList>
            <Step value="1" class="stepTitle">Pergunta</Step>
            <Step value="2" class="stepTitle">Avaliação 1</Step>
            <Step value="3" class="stepTitle">Avaliação 2</Step>
            <Step value="4" class="stepTitle">Escolha Final</Step>
            <Step value="5" class="stepTitle">Concluido</Step>
        </StepList>
    </Stepper>
</template>

<script setup lang="ts">
    import Stepper from 'primevue/stepper';
    import StepList from 'primevue/steplist';
    import Step from 'primevue/step';

    defineProps({
        currentStep: String
    })
</script>

<style scoped>
.stepper {
    width: 1200px;
}
.stepTitle {
    font-size: 17px;
    font-weight: bold;
}
.p-stepper {
   --p-stepper-step-title-color: white;
   --p-stepper-step-title-active-color: white; 
   --p-stepper-step-title-font-size: 200px;

   --p-stepper-step-number-color: black;
   --p-stepper-step-number-background: black;
   --p-stepper-step-number-border-color: black;

   --p-stepper-step-number-active-color: #01CF68;
   --p-stepper-step-number-active-background: #01CF68;
   --p-stepper-step-number-active-border-color: #01CF68;
   --p-stepper-step-number-size: 32px;

   --p-stepper-separator-background: black;
   --p-stepper-separator-active-background: #01CF68;
   --p-stepper-separator-size: 3px;

}
</style>