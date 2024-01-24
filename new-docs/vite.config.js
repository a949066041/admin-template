import { defineConfig, mergeConfig } from 'vite'
import defaultConfig from '@yy-admin/config-vite-app'
import Markdown from 'unplugin-vue-markdown/vite'

import { demoBlockPlugin } from './src/demo'

export default mergeConfig(defaultConfig(), defineConfig({
  plugins: [
    Markdown({
      markdownItSetup(md) {
        md.use(demoBlockPlugin)
      },
    }),
  ],
}))
