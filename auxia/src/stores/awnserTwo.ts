import api from "@/services/api";
import { defineStore } from "pinia";

export const useAwnserTwoStore = defineStore("answerTwo", {
  state: () => ({
    usr_email: "adm@adm.com",
    ans_prompt: "",
    ans_llm_answer: "",
    ans_llm_model: "",
    ans_aderencia_prompt_justify: "",
    ans_aderencia_prompt_pontuation: 0,
    ans_coerencia_clareza_justify: "",
    ans_coerencia_clareza_pontuation: 0,
    ans_exatidao_confiabilidade_justify: "",
    ans_exatidao_confiabilidade_pontuation: 0,
    ans_exposicao_justificativa_justify: "",
    ans_exposicao_justificativa_pontuation: 0,
    ans_idioma_pergunta_mesmo_resposta_justify: "",
    ans_idioma_pergunta_mesmo_resposta_pontuation: 0,
    ans_resposta_agressiva_ofensiva_justify: "",
    ans_resposta_agressiva_ofensiva_pontuation: 0,
    ans_prefered_answer: "",
    ans_prefered_answer_justify: "",
  }),

  getters: {
    totalPontuation(): number {
      return (
        this.ans_aderencia_prompt_pontuation +
        this.ans_coerencia_clareza_pontuation +
        this.ans_exatidao_confiabilidade_pontuation +
        this.ans_exposicao_justificativa_pontuation +
        this.ans_idioma_pergunta_mesmo_resposta_pontuation +
        this.ans_resposta_agressiva_ofensiva_pontuation
      );
    },
  },

  actions: {
    async registerAnswer() {
      const token = localStorage.getItem("token")
      try {
        const payload = {
          usr_email: this.usr_email,
          ans_prompt: this.ans_prompt,
          ans_llm_answer: this.ans_llm_answer,
          ans_llm_model: this.ans_llm_model,
          ans_aderencia_prompt_justify: this.ans_aderencia_prompt_justify,
          ans_aderencia_prompt_pontuation: this.ans_aderencia_prompt_pontuation,
          ans_coerencia_clareza_justify: this.ans_coerencia_clareza_justify,
          ans_coerencia_clareza_pontuation: this.ans_coerencia_clareza_pontuation,
          ans_exatidao_confiabilidade_justify: this.ans_exatidao_confiabilidade_justify,
          ans_exatidao_confiabilidade_pontuation: this.ans_exatidao_confiabilidade_pontuation,
          ans_exposicao_justificativa_justify: this.ans_exposicao_justificativa_justify,
          ans_exposicao_justificativa_pontuation: this.ans_exposicao_justificativa_pontuation,
          ans_idioma_pergunta_mesmo_resposta_justify: this.ans_idioma_pergunta_mesmo_resposta_justify,
          ans_idioma_pergunta_mesmo_resposta_pontuation: this.ans_idioma_pergunta_mesmo_resposta_pontuation,
          ans_resposta_agressiva_ofensiva_justify: this.ans_resposta_agressiva_ofensiva_justify,
          ans_resposta_agressiva_ofensiva_pontuation: this.ans_resposta_agressiva_ofensiva_pontuation,
          ans_prefered_answer: this.ans_prefered_answer,
          ans_prefered_answer_justify: this.ans_prefered_answer_justify,
        };

        const res = await api.post("/answer", payload, {
          headers: {
            Authorization: "Bearer " + token
          }, timeout: 10000
        });
        return res.status === 201;
      } catch {
        return false;
      }
    },

    allStandardIsJustifyAndPontuated(): boolean {
      const validScore = (n: number) => n > 0 && n <= 5;

      if (!this.ans_aderencia_prompt_justify.trim() || !validScore(this.ans_aderencia_prompt_pontuation)) return false;
      if (!this.ans_coerencia_clareza_justify.trim() || !validScore(this.ans_coerencia_clareza_pontuation)) return false;
      if (!this.ans_exatidao_confiabilidade_justify.trim() || !validScore(this.ans_exatidao_confiabilidade_pontuation)) return false;
      if (!this.ans_exposicao_justificativa_justify.trim() || !validScore(this.ans_exposicao_justificativa_pontuation)) return false;
      if (!this.ans_idioma_pergunta_mesmo_resposta_justify.trim() || !validScore(this.ans_idioma_pergunta_mesmo_resposta_pontuation)) return false;
      if (!this.ans_resposta_agressiva_ofensiva_justify.trim() || !validScore(this.ans_resposta_agressiva_ofensiva_pontuation)) return false;

      return true;
    },

    setPontuationByNumber(critNum: number, pt: number) {
      switch (critNum) {
        case 1: this.ans_aderencia_prompt_pontuation = pt; break;
        case 2: this.ans_coerencia_clareza_pontuation = pt; break;
        case 3: this.ans_exatidao_confiabilidade_pontuation = pt; break;
        case 4: this.ans_exposicao_justificativa_pontuation = pt; break;
        case 5: this.ans_idioma_pergunta_mesmo_resposta_pontuation = pt; break;
        case 6: this.ans_resposta_agressiva_ofensiva_pontuation = pt; break;
      }
    },

    setJustifyByNumber(critNum: number, text: string) {
      switch (critNum) {
        case 1: this.ans_aderencia_prompt_justify = text; break;
        case 2: this.ans_coerencia_clareza_justify = text; break;
        case 3: this.ans_exatidao_confiabilidade_justify = text; break;
        case 4: this.ans_exposicao_justificativa_justify = text; break;
        case 5: this.ans_idioma_pergunta_mesmo_resposta_justify = text; break;
        case 6: this.ans_resposta_agressiva_ofensiva_justify = text; break;
      }
    },

    getPontuationByNumber(critNum: number): number {
      switch (critNum) {
        case 1: return this.ans_aderencia_prompt_pontuation;
        case 2: return this.ans_coerencia_clareza_pontuation;
        case 3: return this.ans_exatidao_confiabilidade_pontuation;
        case 4: return this.ans_exposicao_justificativa_pontuation;
        case 5: return this.ans_idioma_pergunta_mesmo_resposta_pontuation;
        case 6: return this.ans_resposta_agressiva_ofensiva_pontuation;
      }
      return 0;
    },

    getJustifyByNumber(critNum: number): string {
      switch (critNum) {
        case 1: return this.ans_aderencia_prompt_justify;
        case 2: return this.ans_coerencia_clareza_justify;
        case 3: return this.ans_exatidao_confiabilidade_justify;
        case 4: return this.ans_exposicao_justificativa_justify;
        case 5: return this.ans_idioma_pergunta_mesmo_resposta_justify;
        case 6: return this.ans_resposta_agressiva_ofensiva_justify;
      }
      return "";
    },
  },
});

