import type { ComponentResolver } from 'unplugin-vue-components'
import { defineConfig } from '@rsbuild/core'
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/rspack'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/rspack'

export function YyNaiveuiComponents(): ComponentResolver {
  const customComponent = new Set([
    'YySearch',
    'YyTable',
    'YyModal',
    'YySelect',
    'YyTreeSelect',
    'YyRangeDatePicker',
    'YyDatePicker',
    '',
  ])

  return {
    type: 'component',
    resolve(componentName: string) {
      if (customComponent.has(componentName))
        return { name: componentName, from: '@yy-admin/components-naive' }
    },
  }
}

export default () => defineConfig({
  source: {
    entry: {
      index: './src/main.ts',
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'custom',
      splitChunks: {
        cacheGroups: {
          'vue': {
            test: /node_modules[\\/](vue|vue-router|pinia)[\\/]/,
            name: 'vue',
            chunks: 'all',
          },
          'naive-ui': {
            test: /node_modules[\\/](naive-ui)[\\/]/,
            name: 'naive-ui',
          },
          'echarts': {
            test: /node_modules[\\/](echarts|zrender)[\\/]/,
            name: 'echarts',
          },
        },
      },
    },
  },
  tools: {
    rspack: {
      plugins: [
        AutoImport({
          imports: ['vue', 'vue-router', '@vueuse/core', {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          }],
          vueTemplate: true,
        }),
        Components({
          dts: true,
          resolvers: [
            NaiveUiResolver(),
            YyNaiveuiComponents(),
          ],
        }),
      ],
    },
  },
  plugins: [
    pluginVue(),
    pluginVueJsx(),
    pluginLess(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000/',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
      '/avatar': {
        target: 'http://localhost:8000/',
      },
    },
  },
})
