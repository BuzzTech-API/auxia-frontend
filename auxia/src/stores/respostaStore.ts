import { defineStore } from "pinia";

export const useRespostaStore = defineStore("respostaLLM", {
  state: () => ({
    response1: "",
    response2: "",
    modelLlm1: "",
    modelLlm2: "",
  }),

  actions: {
    set(data: { response1: string; response2: string; modelLlm1: string; modelLlm2: string; }) {
      this.response1 = data.response1;
      this.response2 = data.response2;
      this.modelLlm1 = data.modelLlm1;
      this.modelLlm2 = data.modelLlm2;
      console.log("Dados armazenados:", this.modelLlm1, this.response1);
    },
  },
});
