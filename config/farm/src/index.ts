import { resolve } from 'node:path'
import type { UserConfig } from '@farmfe/core'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default {
  compilation: {
    input: {
      index: 'src/index.ts',
    },
    external: ['naive-ui', 'lodash-es', 'echarts', 'vue', 'vue-router', 'pinia', 'uno.css'],
    mode: 'production',
  },
  vitePlugins: [
    vue(),
    vueJsx(),
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
      ],
    }),
    Icons({
      autoInstall: true,
      customCollections: {
        custom: FileSystemIconLoader(resolve('../../config/vite/src/svg'), svg => svg.replace('<svg ', '<svg fill="currentColor" ')),
      },
    }),
  ],
} as UserConfig
