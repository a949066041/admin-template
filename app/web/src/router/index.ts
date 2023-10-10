import { createRouter, createWebHistory } from 'vue-router'
import { Layout, Login } from '@yy-admin/common-admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'home',
      component: Login,
    },
    {
      path: '/',
      name: 'about',
      component: Layout,
      children: [
        {
          path: '/',
          component: () => import('../views/AboutView.vue'),
        },
      ],
    },
  ],
})

export default router
