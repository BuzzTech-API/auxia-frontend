import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: () => import('../views/ChatView.vue'),
    },
    {
      path: '/norag',
      name: 'norag',
      component: () => import('../views/ChatViewNoRag.vue'),
    },
    {
      path: '/resposta',
      name: 'resposta',
      component: () => import('../views/RespostasView.vue'),
    },
    {
      path: '/avaliacaoFinal',
      name: 'avaliacaoFinal',
      component: () => import('../views/AvaliacaoFinal.vue'),
    },
    {
      path: '/AdminView',
      name: 'AdminView',
      component: () => import('../views/AdminView.vue'),
    },
    {
      path: '/cadastroUsuario',
      name: 'AdminView',
      component: () => import('../views/CadastroUsuario.vue'),
    },
    {
      path: '/lalala',
      name: 'lalala',
      component: () => import('../views/Lalala.vue'),
    },
  ],
})

export default router
