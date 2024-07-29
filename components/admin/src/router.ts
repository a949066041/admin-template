import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { Layout, Login, UserSetting } from './components'

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
    history: createWebHistory('/'),
    routes: baseRoutres,
  })
}

export const loginRoute = {
  key: 'ext',
  path: '/ext',
  name: 'Ext',
  component: Layout,
  hidden: true,
  redirect: 'noredirect',
  children: [
    {
      path: 'setting',
      component: UserSetting,
      name: '个人中心',
      meta: { title: '个人中心' },
    },
  ],
}
