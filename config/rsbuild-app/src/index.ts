import type { ComponentResolver } from 'unplugin-vue-components'
import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import { UnoCSSRspackPlugin } from '@unocss/webpack/rspack'
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
  ])

  return {
    type: 'component',
    resolve(componentName: string) {
      if (customComponent.has(componentName))
        return { name: componentName, from: '@yy-admin/components-naive' }
    },
  }
}

export default () => {
  return defineConfig({
    source: {
      entry: {
        index: './src/main.ts',
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
          UnoCSSRspackPlugin({
          }),
        ],
      },
    },
    plugins: [
      pluginVue(),
      pluginVueJsx(),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'http://192.168.2.91:8000/',
          pathRewrite: { '^/api': '' },
          changeOrigin: true,
        },
        '/avatar': {
          target: 'http://192.168.2.91:8000/',
        },
      },
    },
  })
}
