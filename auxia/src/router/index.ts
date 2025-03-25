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
      path: '/lalala',
      name: 'lalala',
      component: () => import('../views/Lalala.vue'),
    },
  ],
})

export default router
