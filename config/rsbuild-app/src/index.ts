import { defineConfig, mergeRsbuildConfig } from '@rsbuild/core'
import commonRsbuildConfig from '@yy-admin/config-rsbuild'
import type { ComponentResolver } from 'unplugin-vue-components/types'

export function YyNaiveuiComponents(): ComponentResolver {
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

export default () => mergeRsbuildConfig(commonRsbuildConfig({
  resolvers: [YyNaiveuiComponents()],
}), defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'http://110.41.161.81/',
        rewrite: (path: string) => path.replace(/^\/api\//, ''),
        changeOrigin: true,
      },
      '/avatar': {
        target: 'http://110.41.161.81/',
      },
    },
  },
}))
