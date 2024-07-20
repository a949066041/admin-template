import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import type { ComponentResolver } from 'unplugin-vue-components'
import { pluginLess } from '@rsbuild/plugin-less'
import Components from 'unplugin-vue-components/rspack'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/rspack'

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
        return { name: componentName, from: '@yy-admin/components-naive', sideEffects: '@yy-admin/components-naive/dist/style.css' }
    },
  }
}

export default () => defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
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
        target: 'http://110.41.161.81/',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
      '/avatar': {
        target: 'http://110.41.161.81/',
      },
    },
  },
})
