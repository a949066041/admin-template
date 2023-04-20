import { URL, fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import defaultConfig from '@yy-admin/config-vite'

export default mergeConfig(defaultConfig(), {
  server: {
    proxy: {
      '/api': {
        target: 'https://eladmin.vip',
        rewrite: path => path.replace(/^\/api\//, ''),
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
