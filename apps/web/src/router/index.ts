import { createRouter, createWebHistory } from 'vue-router'
import { Layout, Login } from '@yy-admin/components-admin'

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
          meta: {
            title: '首页',
            affix: true,
          },
          component: () => import('../views/AboutView.vue'),
        },
      ],
    },
  ],
})

export default router
