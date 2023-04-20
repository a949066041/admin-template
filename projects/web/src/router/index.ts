import { createRouter, createWebHistory } from 'vue-router'
import { YyLayout } from '@yy-admin/common-components'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      name: 'about',
      component: YyLayout,
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
