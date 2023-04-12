import { URL, fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import defaultConfig from '@yy-admin/config-vite'

export default mergeConfig(defaultConfig(), {
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
