import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

export default (isMobile = false) => defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://121.4.39.70:8000',
        rewrite: path => path.replace(/^\/api\//, ''),
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(resolve(__dirname, '../../../unocss.config.ts')),
    AutoImport({
      resolvers: isMobile ? [VantResolver()] : [],
    }),
  ],
})
