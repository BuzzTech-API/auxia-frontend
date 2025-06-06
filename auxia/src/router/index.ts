import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import api from '@/services/api'
import { pinia } from '@/main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Chat', component: () => import('../views/ChatView.vue') },
    { path: '/norag', name: 'norag', component: () => import('../views/ChatViewNoRag.vue') },
    { path: '/rag', name: 'rag', component: () => import('../views/ChatViewRag.vue') },
    { path: '/resposta', name: 'Resposta 1', component: () => import('../views/RespostasView1.vue') },
    { path: '/resposta2', name: 'Resposta 2', component: () => import('../views/RespostasView2.vue') },
    { path: '/avaliacaoFinal', name: 'Avaliação Final', component: () => import('../views/AvaliacaoFinal.vue') },
    { path: '/conclusao', name: 'Conclusão', component: () => import('../views/ConclusaoView.vue') },
    { path: '/AdminView', name: 'Painel Administrativo', component: () => import('../views/AdminView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/cadastroUsuario', name: 'CadastroUsuario', component: () => import('../views/CadastroUsuario.vue') },
    { path: '/lalala', name: 'lalala', component: () => import('../views/Lalala.vue') },
  ]
})

function removeToken() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

// getMe com integração à store global
async function fetchUserAndSyncStore() {
  const token = localStorage.getItem('access_token')
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
  const user = useUserStore(pinia)

  // 1) Se ainda não carregou perfil, tenta
  if (!user.usr_email) {
    try {
      const user = await fetchUserAndSyncStore()
    } catch {
      removeToken()
      // qualquer outra → vai pro login
      return { name: 'Login' }
    }
  }

  if (!user.usr_email) {
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

