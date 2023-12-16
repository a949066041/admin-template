import type { ComponentResolver } from 'unplugin-vue-components/types'

export function YyAntdComponents(): ComponentResolver {
  const customComponent = new Set([
    'YySearch',
    'YyTable',
    'YyModal',
    'YySelect',
    'YyTreeSelect',
    'YyRangeDatePicker',
    'YyDatePicker',
  ])

  return {
    type: 'component',
    resolve(componentName: string) {
      if (customComponent.has(componentName))
        return { name: componentName, from: '@yy-admin/components-naive', sideEffects: '@yy-admin/components-naive/dist/style.css' }
    },
  }
}
