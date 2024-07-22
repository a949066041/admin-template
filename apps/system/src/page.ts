import type { AsyncRouters } from '@yy-admin/common-core'
import { addModulePageList } from '@yy-admin/components-admin'

export function systemPageList() {
  const context = import.meta.webpackContext('./views', {
    recursive: true,
    regExp: /\.vue$/,
    mode: 'lazy',
  })
  return addModulePageList(context.keys().reduce((base, item) => {
    base[item.replace('./', '')] = context(item)
    return base
  }, {} as AsyncRouters), 'system')
}
export function testPageList() {
  return {
    'generator/config': () => import('./views/generator/config.vue'),
  }
}

export const systemHomePage = () => import('./views/home-page.vue')
