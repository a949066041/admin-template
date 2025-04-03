import type { AsyncRouters } from '@yy-admin/common-core'
import { addModulePageList } from '@yy-admin/components-admin'

export function monitorPageList() {
  const context = import.meta.webpackContext('./views', {
    recursive: true,
    regExp: /\.vue$/,
  })
  return addModulePageList(context.keys().reduce((base, item) => {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    base[item.replace('./', '')] = context(item).default
    return base
  }, {} as AsyncRouters), 'monitor')
}
