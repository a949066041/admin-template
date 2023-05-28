import type { Router } from 'vue-router'
import type { MenuList } from '../api/login.type'

export type AsyncRouters = Record<string, (() => Promise<unknown>) | unknown>

export function withSrcViewModules(routers: AsyncRouters) {
  return Object.entries(routers).reduce((base, [k, v]) => {
    base[k.replace('/src/views/', '').replace('.vue', '')] = v
    return base
  }, {} as AsyncRouters)
}

export function addWebRouter(
  router: Router,
  menuList: MenuList[],
  routerModules?: AsyncRouters,
) {
  const realRouter = registerRouter(menuList,
    [],
    routerModules || {})
  const renderRouter = registerRouter(menuList, [], {}, true)
  realRouter.forEach((item) => {
    router.addRoute(item as any)
  })
  return renderRouter
}

function registerRouter(
  menuList: MenuList[],
  parentPath = [] as string[],
  mathLayout: Record<string, any> = {},
  delComponent = false,
): MenuList[] {
  return menuList.map((item) => {
    const path = parentPath.concat(item.path).join('/')
    const baseRoute = {
      key: path,
      ...item,
      label: item.meta.title,
      title: item.meta.title,
      path,
      component: mathLayout[item.component],
      children: item.children
        ? registerRouter(item.children as MenuList[], parentPath.concat(item.path), mathLayout)
        : null,
    }
    delComponent && delete baseRoute.component
    return baseRoute
  }) as MenuList[]
}
