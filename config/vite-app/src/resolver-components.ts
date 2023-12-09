import type { ComponentResolver } from 'unplugin-vue-components/types'

export function YyAntdComponents(): ComponentResolver {
  const customComponent = new Set([
    'YySearch',
    'YyTable',
    'YyModal',
  ])

  return {
    type: 'component',
    resolve(componentName: string) {
      if (customComponent.has(componentName))
        return { name: componentName, from: '@yy-admin/components-vexip', sideEffects: '@yy-admin/components-vexip/dist/style.css' }
    },
  }
}
