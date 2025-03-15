import { tokenStorage, useUserStore } from '@yy-admin/common-core'
import { createRouter, createWebHistory } from 'vue-router'
import { genComponents } from '../utils'

const router = createRouter({
  history: createWebHistory('/docs'),
  routes: Object.entries(genComponents()).map(([k, v]) => ({ path: `/${k}`, component: v })),
})

router.beforeEach((to, form, next) => {
  const token = tokenStorage.getValue()
  const userStore = useUserStore()
  if (token) {
    userStore.getUserInfo(true).then(next)
    return
  }
  next()
})

export default router
