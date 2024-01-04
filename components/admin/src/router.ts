import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { Login } from './components'

export function createYyRouter(home?: RouteRecordRaw) {
  const baseRoutres = [
    {
      path: '/login',
      name: 'home',
      component: Login,
    },
  ]

  if (home)
    baseRoutres.push(home as any)

  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: baseRoutres,
  })
}
