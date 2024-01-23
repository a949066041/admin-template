import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/rspack'
import Components from 'unplugin-vue-components/rspack'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import type { ComponentResolver } from 'unplugin-vue-components/types'

export interface ICommonRsbuildConfig {
  resolvers?: ComponentResolver[]
  report?: boolean
}

export default (_config?: ICommonRsbuildConfig) => {
  const config = {
    resolvers: [],
    report: false,
    ..._config,
  } as Required<ICommonRsbuildConfig>
  return defineConfig({
    tools: {
      rspack: {
        plugins: [
          pluginVue(),
          pluginBabel({
            include: /\.(?:jsx|tsx)$/,
            exclude: /[\\/]node_modules[\\/]/,
          }),
          pluginVueJsx(),
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
              IconsResolver({
                customCollections: ['custom', 'custom2'],
              }),
              NaiveUiResolver(),
              ...config.resolvers,
            ],
          }),
        ],
      },
    },
  })
}
