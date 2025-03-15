import { plugins, resolvePkgPath, scanFile, shortList, transFormConfig } from '@yy-admin/config-unocss'
import { defineConfig } from 'unocss'

export default defineConfig({
  content: {
    filesystem: [
      `./src/${scanFile}`,
      resolvePkgPath(__dirname, require.resolve('@yy-admin/components-admin')),
      resolvePkgPath(__dirname, require.resolve('@yy-admin/web-monitor')),
      resolvePkgPath(__dirname, require.resolve('@yy-admin/web-system')),
      resolvePkgPath(__dirname, require.resolve('@yy-admin/common-css')),
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
