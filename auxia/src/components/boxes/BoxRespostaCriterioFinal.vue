<script setup lang="ts">
import BoxCriterioNotaFinal from "@/components/boxes/BoxCriterioNotaFinal.vue";
import { marked } from "marked";
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

const props = defineProps<{
  resposta: string;
  awnserNumber: number;
  criterios: { numero: number; descricao: string; criterio: string; nota: number }[];
}>();

const respostaHTML = marked.parse(props.resposta);
</script>

<template>
  <Accordion :activeIndex="0">
    <AccordionPanel :value="'resposta' + awnserNumber" class="panel">
      <AccordionHeader class="acordionHeader2">

        <div class="tituloIcone">
        <i class="pi pi-verified" style="font-size: 2rem; color: #01CF68;"></i>
        <p class="titulo">Resposta {{ awnserNumber }}</p>
        </div>
        
      </AccordionHeader>

      <AccordionContent class="acordionContent2">
        <p>Resposta:</p>
        <div class="respostaLLM2" v-html="respostaHTML"></div>

        <p class="tituloCriterioENota">Critérios e Notas:</p>
        <div class="criterios">
          <div v-for="(crit, index) in criterios" :key="index">
            <BoxCriterioNotaFinal 
              :awnserNumber="awnserNumber"
              :criterio="crit.criterio"
              :descricao="crit.descricao"
              :nota="crit.nota" 
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>


<style scoped>
p {
  color: rgb(255, 255, 255);
  font-size: 18px;
}

.respostaLLM2 {
  
  background-color: #585858;
  color: #ffff;
  width: 42rem;
  height: 15rem;
  overflow-y: auto;
  padding: 0.8rem;
  border-radius: 10px;
}

.criterios {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.panel{
   --p-accordion-panel-border-color: transparent;
  
}

.acordionHeader2{

  --p-accordion-header-color: #ffff;
  --p-accordion-header-hover-color: #fffff;
  --p-accordion-header-active-color:#fffff;
  --p-accordion-header-background: #363636;
  --p-accordion-header-hover-background: #363636;
  --p-accordion-header-active-background: #363636;
  --p-accordion-header-active-hover-background: #363636;
  --p-accordion-header-focus-ring-color: #363636;
  --p-accordion-header-border-color: #363636; 
  --p-accordion-header-toggle-icon-color: white;
  --p-accordion-header-toggle-icon-hover-color: white;
  --p-accordion-header-toggle-icon-active-color:white;
  --p-accordion-header-toggle-icon-active-hover-color: white;
  background-color: #363636;
  font-size: 28px;
}


.acordionContent2{
  background-color: #363636;
  --p-accordion-content-background: #363636;
  --p-accordion-content-color:  inherit;
  --p-accordion-content-border-color: #363636;
  --p-accordion-content-border-width: 1px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px; 
}


.tituloCriterioENota{
  margin-top: 1rem;
}

.tituloIcone {
  display: flex;             
  align-items: center;       
  gap: 0.5rem;              
}

.titulo{
  font-size: 28px;
}

</style>
