import api from '@/services/api';
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
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
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

async function isTokenValid() {
  const token = localStorage.getItem('token');
  // Aqui você pode adicionar lógica de expiração ou validação JWT
  if (token) {
    const me = await api.get("/user/me/", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    if (me.status === 200) {
      return true
    }
  }
  localStorage.removeItem('token')
  return false
}

async function isAdminastrator(): Promise<boolean> {
  const token = localStorage.getItem('token');
  // Aqui você pode adicionar lógica de expiração ou validação JWT
  if (token) {
    const me = await api.get("/user/me/", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    if (me.status === 200) {
      return me.data.usr_is_adm
    }
  }
  localStorage.removeItem('token')
  return false
}


router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await isTokenValid();
  const isAdm = await isAdminastrator()

  // Se o usuário NÃO está autenticado
  if (!isAuthenticated) {
    // Qualquer rota que não seja login deve ir para login
    if (to.path !== '/login') {
      return next('/login');
    }
    return next(); // Permite ir para login
  }

  // Se o usuário ESTÁ autenticado
  if (isAuthenticated) {
    // Evita que vá para login se já estiver logado
    if (to.path === '/login') {
      return next('/');
    }

    // Se tentar acessar rota de admin e não for admin
    if (to.path === '/AdminView' && !isAdm) {
      return next('/'); // ou para uma rota "acesso negado"
    }
  }

  // Se passou por tudo, permite a navegação
  next();
});

export default router
