import { URL, fileURLToPath } from 'node:url'
import { defineConfig, mergeConfig } from 'vite'
import defaultConfig from '@yy-admin/config-vite-app'
import Markdown from 'unplugin-vue-markdown/vite'
import Shikiji from '@shikijs/markdown-it'
import { MarkdownTransform } from './plugins/resolve-type'

import { demoBlockPlugin } from './plugins/demo-md'

export default mergeConfig(defaultConfig(), defineConfig({
  base: '/docs',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    MarkdownTransform(),
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
