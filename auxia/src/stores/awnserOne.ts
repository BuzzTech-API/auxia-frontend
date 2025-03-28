import { defineStore } from "pinia";


export const useAwnserOneStore = defineStore(`awnserOne`,{
  state: ()=>{
    return{
      usr_id: "",
      ans_prompt:"",
      ans_llm_awnser:"",
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
    },
    setPotuationByNumber(criterioNumber: number, potuation: number){
    if (criterioNumber === 1) {
     this.ans_relevancia_resposta_pontuation = potuation
    }else if (criterioNumber === 2){
    this.ans_coerencia_clareza_pontuation = potuation
      }else if (criterioNumber === 3){
    this.ans_exatidao_confiabilidade_pontuation = potuation
      }else if (criterioNumber === 4){
    this.ans_exposicao_justificativa_pontuation = potuation
      }else if (criterioNumber === 5){
    this.ans_seguiu_instrucoes_pontuation = potuation
      }else if (criterioNumber === 6){
    this.ans_idioma_pergunta_mesmo_resposta_pontuation = potuation
      }else if (criterioNumber === 7){
    this.ans_resposta_agressiva_ofensiva_pontuation = potuation
      }
    },
    setJustifyByNumber(criterioNumber: number, justify: string){
    if (criterioNumber === 1) {
     this.ans_relevancia_resposta_justify = justify
    }else if (criterioNumber === 2){
    this.ans_coerencia_clareza_justify = justify
      }else if (criterioNumber === 3){
    this.ans_exatidao_confiabilidade_justify = justify
      }else if (criterioNumber === 4){
    this.ans_exposicao_justificativa_justify = justify
      }else if (criterioNumber === 5){
    this.ans_seguiu_instrucoes_justify = justify
      }else if (criterioNumber === 6){
    this.ans_idioma_pergunta_mesmo_resposta_justify = justify
      }else if (criterioNumber === 7){
    this.ans_resposta_agressiva_ofensiva_justify = justify
      }
    },
    getPotuationByNumber(criterioNumber: number): number{
    if (criterioNumber === 1) {
    return this.ans_relevancia_resposta_pontuation
    }else if (criterioNumber === 2){
    return this.ans_coerencia_clareza_pontuation
      }else if (criterioNumber === 3){
    return this.ans_exatidao_confiabilidade_pontuation
      }else if (criterioNumber === 4){
    return this.ans_exposicao_justificativa_pontuation
      }else if (criterioNumber === 5){
    return this.ans_seguiu_instrucoes_pontuation
      }else if (criterioNumber === 6){
    return this.ans_idioma_pergunta_mesmo_resposta_pontuation
      }else if (criterioNumber === 7){
    return this.ans_resposta_agressiva_ofensiva_pontuation
      }
      return 0
    },
    getJustifyByNumber(criterioNumber: number):string{
    if (criterioNumber === 1) {
    return this.ans_relevancia_resposta_justify
    }else if (criterioNumber === 2){
    return this.ans_coerencia_clareza_justify
      }else if (criterioNumber === 3){
    return this.ans_exatidao_confiabilidade_justify
      }else if (criterioNumber === 4){
    return this.ans_exposicao_justificativa_justify
      }else if (criterioNumber === 5){
    return this.ans_seguiu_instrucoes_justify
      }else if (criterioNumber === 6){
    return this.ans_idioma_pergunta_mesmo_resposta_justify
      }else if (criterioNumber === 7){
    return this.ans_resposta_agressiva_ofensiva_justify
      }
      return ""
    }
  }
})
