import { tokenStorage, useUserStore } from '@yy-admin/common-core'
import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { DemoBlock } from '../components'
import { genComponents } from '../utils'

const router = createRouter({
  history: createWebHistory('/docs'),
  routes: Object.entries(genComponents()).map(([k, v]) => ({ path: `/${k}`, component: h(v, { components: { DemoBlock } }) })),
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
