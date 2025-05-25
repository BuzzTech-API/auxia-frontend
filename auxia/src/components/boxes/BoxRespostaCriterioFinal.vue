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

/* listas */
.respostaLLM2 ::v-deep ul,
.respostaLLM2 ::v-deep ol {
  margin: 0.5em 0 !important;
  padding-inline-start: 1.25rem !important;
}
.respostaLLM2 ::v-deep ul {
  list-style-type: disc !important;
}
.respostaLLM2 ::v-deep ol {
  list-style-type: decimal !important;
}

/* parágrafos e cabeçalhos */
.respostaLLM2 ::v-deep p {
  margin: 0.75em 0 !important;
  line-height: 1.6 !important;
}
.respostaLLM2 ::v-deep h1,
.respostaLLM2 ::v-deep h2,
.respostaLLM2 ::v-deep h3,
.respostaLLM2 ::v-deep h4,
.respostaLLM2 ::v-deep h5,
.respostaLLM2 ::v-deep h6 {
  margin: 1em 0 0.5em !important;
  font-weight: bold !important;
  line-height: 1.3 !important;
}

/* ênfase e strong */
.respostaLLM2 ::v-deep em {
  font-style: italic !important;
}
.respostaLLM2 ::v-deep strong {
  font-weight: 700 !important;
}

/* código inline e blocos de código */
.respostaLLM2 ::v-deep code {
  background-color: #2d2d2d !important;
  color: #f8f8f2 !important;
  padding: 0.2em 0.4em !important;
  border-radius: 4px !important;
  font-family: monospace !important;
  font-size: 0.9em !important;
}
.respostaLLM2 ::v-deep pre {
  background-color: #2d2d2d !important;
  color: #f8f8f2 !important;
  padding: 1em !important;
  overflow: auto !important;
  border-radius: 4px !important;
  margin: 1em 0 !important;
}

/* links */
.respostaLLM2 ::v-deep a {
  color: #4ea1d3 !important;
  text-decoration: underline !important;
}

/* blocos de citação */
.respostaLLM2 ::v-deep blockquote {
  border-left: 4px solid #e0d500 !important;
  padding-left: 1em !important;
  color: #ccc !important;
  margin: 1em 0 !important;
}
</style>
