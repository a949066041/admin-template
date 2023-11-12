import type { MenuList } from '@yy-admin/apis'
import { first } from 'lodash'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export interface IRouteBreadcrumbItem {
  path: string
  name: string
  children?: IRouteBreadcrumbItem[]
}
const homePage = { path: '/', name: '首页' }

export function useBreadcrumb() {
  const route = useRoute()

  const breadcrumbList = computed<IRouteBreadcrumbItem[]>(() => {
    const parentRoute = first(route.matched) as unknown as MenuList
    if (!parentRoute || route.path === '/')
      return [homePage]
    const parentRoutes = {
      path: parentRoute.path,
      name: parentRoute.name,
      children: parentRoute.children!.map(item => ({ path: item.path, name: item.meta.title })),
    }
    return [homePage, parentRoutes, { path: route.path, name: route.meta.title as string }]
  })

  return {
    breadcrumbList,
  }
}
