import { defineConfig, mergeConfig } from 'vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import VueDevTools from 'vite-plugin-vue-devtools'
import type { ComponentResolver } from 'unplugin-vue-components/types'
import commonViteConfig from '@yy-admin/config-vite'
import { YyAntdComponents } from './resolver-components'

export default (isMobile = false) => mergeConfig(commonViteConfig({
  resolvers: [isMobile? VantResolver() : null, YyAntdComponents()].filter(Boolean) as ComponentResolver[],
}), defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://110.41.161.81/',
        rewrite: path => path.replace(/^\/api\//, ''),
        changeOrigin: true,
      },
    },
  },
  plugins: [
    VueDevTools()
  ],
}))
