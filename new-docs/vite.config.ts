import { URL, fileURLToPath } from 'node:url'
import { defineConfig, mergeConfig } from 'vite'
import defaultConfig from '@yy-admin/config-vite-app'
import Markdown from 'unplugin-vue-markdown/vite'
import Shikiji from 'markdown-it-shikiji'

import { demoBlockPlugin } from './plugins/demo-md'

export default mergeConfig(defaultConfig(), defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@yy-web/common-api': fileURLToPath(new URL('../common/apis/src/index.ts', import.meta.url)),
    },
  },
  plugins: [
    Markdown({
      async markdownItSetup(md) {
        md.use(demoBlockPlugin)

        md.use(await Shikiji({
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
        }))
      },
    }),
  ],
}))
