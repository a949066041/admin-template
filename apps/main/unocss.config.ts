import { defineConfig } from 'unocss'
import { plugins, resolvePkgPath, scanFile, transFormConfig } from '@yy-admin/config-unocss'

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
  presets: [
    ...plugins,
  ],
  transformers: [
    ...transFormConfig,
  ],
})
