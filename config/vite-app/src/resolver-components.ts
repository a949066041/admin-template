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
      console.log(componentName)
      if (customComponent.has(componentName))
        return { name: componentName, from: '@yy-admin/components-antdv', sideEffects: '@yy-admin/components-antdv/dist/style.css' }
    },
  }
}
