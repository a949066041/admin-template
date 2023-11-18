import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import type { ComponentResolver } from 'unplugin-vue-components/types'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { visualizer } from 'rollup-plugin-visualizer'

export interface ICommonViteConfig {
  resolvers?: ComponentResolver[]
  report?: boolean
}

export default (_config?: ICommonViteConfig) => {
  const config = {
    resolvers: [],
    report: false,
    ..._config,
  } as Required<ICommonViteConfig>
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(resolve(__dirname, '../../../unocss.config.ts')),
      Components({
        dts: true,
        resolvers: [IconsResolver(), ...config.resolvers],
      }),
      Icons({
        autoInstall: true,
      }),
      config.report ? visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: 'report.html', // 分析图生成的文件名
      }) : () => {},
    ],
  })
}
