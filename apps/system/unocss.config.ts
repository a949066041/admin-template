import { config, resolvePkgPath, scanFile } from '@yy-admin/config-unocss'
import { defineConfig, mergeConfigs } from 'unocss'

export default mergeConfigs([defineConfig({
  content: {
    filesystem: [
      `./src/${scanFile}`,
      resolvePkgPath(__dirname, require.resolve('@yy-admin/components-admin')),
      resolvePkgPath(__dirname, require.resolve('@yy-admin/common-css')),
    ],
  },
}), config])
