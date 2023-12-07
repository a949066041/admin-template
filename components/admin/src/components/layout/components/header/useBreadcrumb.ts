import type { MenuList } from '@yy-admin/common-apis'
import { first } from 'lodash-es'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export interface IRouteBreadcrumbItem {
  key: string
  label: string
  children?: IRouteBreadcrumbItem[]
}
const homePage = { key: '/', label: '首页' } as IRouteBreadcrumbItem

export function useBreadcrumb() {
  const route = useRoute()

  const breadcrumbList = computed<IRouteBreadcrumbItem[]>(() => {
    const parentRoute = first(route.matched) as unknown as MenuList
    if (!parentRoute || route.path === '/')
      return [homePage]
    const parentRoutes = {
      key: parentRoute.path,
      label: parentRoute.name,
      children: parentRoute.children!.map(item => ({ key: item.path, label: item.meta.title })),
    }
    return [homePage, parentRoutes, { key: route.path, label: route.meta.title as string }]
  })

  return {
    breadcrumbList,
  }
}
