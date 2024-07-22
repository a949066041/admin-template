import { defineConfig } from 'unocss'
import { plugins, scanFile, shortList, transFormConfig } from '@yy-admin/config-unocss'

export default defineConfig({
  content: {
    filesystem: [
      `./src/${scanFile}`,
    ],
  },
  shortcuts: {
    ...shortList,
  },
  presets: [
    ...plugins,
  ],
  transformers: [
    ...transFormConfig,
  ],
})
