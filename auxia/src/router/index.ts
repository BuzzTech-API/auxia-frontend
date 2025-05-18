// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import api from '@/services/api'
import { createPinia } from 'pinia'

const pinia = createPinia() // Cria manualmente uma instância para uso fora do setup
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/ChatView.vue') },
    { path: '/norag', name: 'norag', component: () => import('../views/ChatViewNoRag.vue') },
    { path: '/resposta', name: 'resposta', component: () => import('../views/RespostasView.vue') },
    { path: '/avaliacaoFinal', name: 'avaliacaoFinal', component: () => import('../views/AvaliacaoFinal.vue') },
    { path: '/AdminView', name: 'AdminView', component: () => import('../views/AdminView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/cadastroUsuario', name: 'CadastroUsuario', component: () => import('../views/CadastroUsuario.vue') },
    { path: '/lalala', name: 'lalala', component: () => import('../views/Lalala.vue') },
  ]
})

function removeToken() {
  localStorage.removeItem('token')
}

// getMe com integração à store global
async function fetchUserAndSyncStore() {
  const token = localStorage.getItem('token')
  if (!token) {
    removeToken()
    return null
  }

  try {
    const response = await api.get("/user/me/", {
      headers: { Authorization: "Bearer " + token }
    })

    const store = useUserStore(pinia)
    store.usr_email = response.data.usr_email
    store.usr_name = response.data.usr_name
    store.usr_is_adm = response.data.usr_is_adm
    store.usr_is_active = response.data.usr_is_active
    
    return response.data
  } catch (error) {
    removeToken()
    return null
  }
}

router.beforeEach(async (to, from, next) => {
  const user = await fetchUserAndSyncStore()

  if (!user) {
    if (to.path !== '/login') return next('/login')
    return next()
  }

  if (to.path === '/login') return next('/')

  if (to.path === '/AdminView' && !user.usr_is_adm) {
    return next('/')
  }

  return next()

})

export default router

