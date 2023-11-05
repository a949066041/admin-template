import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import VueDevTools from 'vite-plugin-vue-devtools'
import type { ComponentResolver } from 'unplugin-vue-components/types'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { YyAntdComponents } from './resolver-components'

export default (isMobile = false) => defineConfig({
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
    vue(),
    VueDevTools(),
    vueJsx(),
    UnoCSS(resolve(__dirname, '../../../unocss.config.ts')),
    Components({
      dts: true,
      resolvers: [isMobile ? VantResolver() : null, YyAntdComponents(), IconsResolver()].filter(Boolean) as ComponentResolver[],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
})
