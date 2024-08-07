import path from 'node:path'

import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import type { ComponentResolver } from 'unplugin-vue-components/types'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { visualizer } from 'rollup-plugin-visualizer'

export interface ICommonViteConfig {
  resolvers?: ComponentResolver[]
  report?: boolean
}

export default (_config?: ICommonViteConfig) => {
  const __filename = fileURLToPath(import.meta.url)

  const __dirname = path.dirname(__filename)
  const config = {
    resolvers: [],
    report: false,
    ..._config,
  } as Required<ICommonViteConfig>
  return defineConfig({
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      vueJsx(),
      UnoCSS({}),
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
      config.report
        ? visualizer({
          gzipSize: true,
          brotliSize: true,
          emitFile: false,
          filename: 'report.html', // 分析图生成的文件名
        }) : () => {},
    ],
  })
}
