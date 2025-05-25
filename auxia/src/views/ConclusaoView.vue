<script setup lang="ts">
import MenuUser from '@/components/menu/MenuUser.vue';
import StepperLine from '@/components/menu/StepperLine.vue';
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
    <div class="flex flex-col w-full">
        <MenuUser />
        <div>
            <div class="container1">
                <div>
                    <StepperLine :currentStep="5" />
                </div>

                <!-- Texto principal -->
                <div class="agradecimento">
                    <h2>
                        Agradecemos por sua avaliação! Sua opinião é essencial para aprimorarmos
                        continuamente a qualidade das respostas geradas. Trabalhamos para oferecer uma experiência cada vez mais
                        precisa, útil e personalizada e seu feedback faz toda a diferença nesse processo.
                        Obrigado por contribuir com a evolução da nossa solução.
                    </h2>
                </div>

                <!-- Botão Novo Chat -->
                <div class="btn-container">
                    <button class="btn-novo-chat" @click="router.push('/')">
                        <span>Novo Chat</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icone" viewBox="1 1 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container1 {
    display: flex;
    flex-direction: column;
    gap: 60px;
    padding-top: 20px;
    align-items: center;
    width: 100%;
    height: 55rem;
}

.agradecimento {
    text-align: center;
    max-width: 64rem;
    margin-top: 0.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
}

.agradecimento h2 {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-bottom: 1.5rem;
    line-height: 1.375;
}

.btn-container {
    margin-top: 1.25rem;
}

.btn-novo-chat {
    background-color: #6B6B6B;
    color: white;
    transition: background-color 0.3s;
    padding: 4rem 4.75rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25);
}

.btn-novo-chat:hover {
    background-color: #5a5a5a;
}

.btn-novo-chat span {
    font-size: 1.875rem;
    font-weight: 500;
}

.icone {
    width: 7rem;
    height: 6rem;
    color: #22c55e;
}
</style>
