import { addModulePageList } from '@yy-admin/components-admin'
import type { AsyncRouters } from '@yy-admin/common-core'

export function monitorPageList() {
  const context = import.meta.webpackContext('./views', {
    recursive: true,
    regExp: /\.vue$/,
    mode: 'lazy',
  })
  return addModulePageList(context.keys().reduce((base, item) => {
    base[item.replace('./', '')] = context(item)
    return base
  }, {} as AsyncRouters), 'monitor')
}
