import type { ComponentResolver } from 'unplugin-vue-components/types'

export function YyAntdComponents(): ComponentResolver {
  const customComponent = new Set([
    'YySelect',
    'YySearch',
    'YyTable',
  ])

  return {
    type: 'component',
    resolve(componentName: string) {
      if (customComponent.has(componentName))
        return { name: componentName, from: '@yy-admin/common-components', sideEffects: '@yy-admin/common-components/dist/style.css' }
    },
  }
}
