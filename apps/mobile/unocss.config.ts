import { config, scanFile } from '@yy-admin/config-unocss'
import { defineConfig, mergeConfigs } from 'unocss'

export default mergeConfigs([defineConfig({
  content: {
    filesystem: [
      `./src/${scanFile}`,
    ],
  },
}), config])
