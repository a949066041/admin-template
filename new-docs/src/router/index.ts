import { createRouter, createWebHistory } from 'vue-router'
import { genComponents } from '../utils'

const router = createRouter({
  history: createWebHistory('/'),
  routes: Object.entries(genComponents()).map(([k, v]) => ({ path: `/${k}`, component: v })),
})

export default router
