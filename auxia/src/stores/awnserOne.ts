import { defineStore } from "pinia";


export const useAwnserOneStore = defineStore(`awnserOne`,{
  state: ()=>{
    return{
      usr_id: "",
      ans_prompt:"",
      ans_llm_model: "",
      ans_relevancia_resposta_justify: "",
      ans_relevancia_resposta_pontuation: 0,
      ans_coerencia_clareza_justify: "",
      ans_coerencia_clareza_pontuation:0,
      ans_exatidao_confiabilidade_justify: "",
      ans_exatidao_confiabilidade_pontuation: 0,
      ans_exposicao_justificativa_justify: "",
      ans_exposicao_justificativa_pontuation: 0,
      ans_seguiu_instrucoes_justify: "",
      ans_seguiu_instrucoes_pontuation: 0,
      ans_idioma_pergunta_mesmo_resposta_justify: "",
      ans_idioma_pergunta_mesmo_resposta_pontuation: 0,
      ans_resposta_agressiva_ofensiva_justify: "",
      ans_resposta_agressiva_ofensiva_pontuation: 0,
      ans_prefered_answer: "",
      ans_prefered_answer_justify: ""
    }
  },

  actions: {
    allStandardIsJustifyAndPontuated(): boolean{
      if (this.ans_relevancia_resposta_justify.length == 0) {
        return false
      }
      if (this.ans_relevancia_resposta_pontuation<= 0 || this.ans_relevancia_resposta_pontuation > 5) {
        return false
      }
      if (this.ans_coerencia_clareza_justify.length == 0) {
        return false
      }
      if (this.ans_coerencia_clareza_pontuation<= 0 || this.ans_coerencia_clareza_pontuation > 5) {
        return false
      }
      if (this.ans_exatidao_confiabilidade_justify.length == 0) {
        return false
      }
      if (this.ans_exatidao_confiabilidade_pontuation<= 0 || this.ans_exatidao_confiabilidade_pontuation> 5) {
        return false
      }
      if (this.ans_exposicao_justificativa_justify.length == 0) {
        return false
      }
      if (this.ans_exposicao_justificativa_pontuation<= 0 || this.ans_exposicao_justificativa_pontuation> 5) {
        return false
      }
      if (this.ans_seguiu_instrucoes_justify.length == 0) {
        return false
      }
      if (this.ans_seguiu_instrucoes_pontuation<= 0 || this.ans_seguiu_instrucoes_pontuation> 5) {
        return false
      }
      if (this.ans_idioma_pergunta_mesmo_resposta_justify.length == 0) {
        return false
      }
      if (this.ans_idioma_pergunta_mesmo_resposta_pontuation <= 0 || this.ans_idioma_pergunta_mesmo_resposta_pontuation > 5) {
        return false
      }
      if (this.ans_resposta_agressiva_ofensiva_justify.length == 0) {
        return false
      }
      if (this.ans_resposta_agressiva_ofensiva_pontuation<= 0 || this.ans_resposta_agressiva_ofensiva_pontuation> 5) {
        return false
      }
      return true
    }
  }
})
