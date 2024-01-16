import type { AsyncRouters } from '@yy-admin/common-core'

export function addModulePageList(pageList: AsyncRouters, moduleName: string) {
  return Object.entries(pageList).reduce((base, [k, v]) => {
    base[`${moduleName}/${k.replace('/src/views/', '').replace('./views/', '')}`] = v
    return base
  }, {} as AsyncRouters)
}
