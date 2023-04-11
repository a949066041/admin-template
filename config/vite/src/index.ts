import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-vue-components/vite'
import { AntDesignVueResolver, VantResolver } from 'unplugin-vue-components/resolvers'

export default (isMobile = false) => defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(resolve(__dirname, '../../../unocss.config.ts')),
    AutoImport({
      resolvers: [isMobile ? VantResolver() : AntDesignVueResolver()],
    }),
  ],
})
