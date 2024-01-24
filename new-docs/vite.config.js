import { defineConfig, mergeConfig } from 'vite'
import defaultConfig from '@yy-admin/config-vite-app'
import Markdown from 'unplugin-vue-markdown/vite'
import Shikiji from 'markdown-it-shikiji'

import { demoBlockPlugin } from './src/demo'

export default mergeConfig(defaultConfig(), defineConfig({
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
