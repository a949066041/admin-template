import type { Router } from 'vue-router'
import type { IMenuBuild } from '@yy-admin/common-apis'
import type { VNode } from 'vue'

export type AsyncRouters = Record<string, (() => Promise<unknown>) | unknown | VNode[]>

export function withSrcViewModules(routers: AsyncRouters) {
  return Object.entries(routers).reduce((base, [k, v]) => {
    base[k.replace('/src/views/', '').replace('./views/', '').replace('.vue', '')] = v
    return base
  }, {} as AsyncRouters)
}

export function addWebRouter(
  router: Router,
  menuList: IMenuBuild[],
  routerModules?: AsyncRouters,
) {
  const realRouter = registerRouter(menuList, [], routerModules || {})
  realRouter.forEach((item) => {
    router.addRoute(item as any)
  })
  return realRouter
}

function registerRouter(
  menuList: IMenuBuild[],
  parentPath = [] as string[],
  mathLayout: Record<string, any> = {},
): IMenuBuild[] {
  return menuList.map((item) => {
    const path = parentPath.concat(item.path).join('/')
    const baseRoute = {
      key: path,
      ...item,
      path,
      name: item.name,
      show: !item.hidden,
      meta: { ...item.meta, key: path },
      component: mathLayout[item.component],
      children: item.children
        ? registerRouter(item.children as IMenuBuild[], parentPath.concat(item.path), mathLayout)
        : undefined,
    }

    return baseRoute
  }) as IMenuBuild[]
}
