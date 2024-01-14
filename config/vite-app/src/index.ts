import { resolve } from 'node:path'
import { defineConfig, mergeConfig } from 'vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import VueDevTools from 'vite-plugin-vue-devtools'
import commonViteConfig from '@yy-admin/config-vite'
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

export default () => mergeConfig(commonViteConfig({
  report: true,
  resolvers: [VantResolver(), YyNaiveuiComponents()],
}), defineConfig({
  build: {
    rollupOptions: {
      output: {
        // manualChunks 配置
        manualChunks: {
          // 将 React 相关库打包成单独的 chunk 中
          naive: ['naive-ui'],
          // 将 Lodash 库的代码单独打包
          lodash: ['lodash-es'],
          // 将组件库的代码打包
          echarts: ['echarts'],
          // vue
          vue: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://110.41.161.81/',
        rewrite: path => path.replace(/^\/api\//, ''),
        changeOrigin: true,
      },
      '/avatar': {
        target: 'http://110.41.161.81/',
      },
    },
  },
  plugins: [
  ],
}))
