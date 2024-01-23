import { defineConfig, mergeRsbuildConfig } from '@rsbuild/core'
import commonAppRsbuild from '@yy-admin/config-rsbuild-app'

export default mergeRsbuildConfig(commonAppRsbuild(), defineConfig({
  html: {
    template: './index.html',
  },
  source: {
    entry: {
      index: './src/main.ts',
    },
  },
}))
