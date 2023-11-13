import { resolve } from 'node:path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import autoprefixer from 'autoprefixer'
import UnoCSS from 'unocss/vite'
import { visualizer } from "rollup-plugin-visualizer";

interface LibConfigOption {
  lib_name: string
}

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function configLib(options: LibConfigOption) {
  return defineConfig({
    mode: 'production',
    build: {
      emptyOutDir: true,
      lib: {
        entry: resolve(process.cwd(), 'src/index.ts'),
        name: options.lib_name,
        fileName: 'index',
        formats: ['es', 'umd', 'cjs'],
      },
      rollupOptions: {
        external: ['vue', 'ant-design-vue', 'ant-design-vue/es'],
        output: {
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(resolve(__dirname, '../../../unocss.config.ts')),
      dts({
        rollupTypes: true,
      }),
      Components({
        dts: true,
        extensions: ['vue', 'tsx'],
        resolvers: [
          AntDesignVueResolver({ importStyle: false }),
        ],
      }),
      // viteExternalsPlugin({
      //   vue: 'Vue',
      //   'ant-design-vue': 'ant-design-vue'
      // }),
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: "test.html", //分析图生成的文件名
      }),
    ],
    css: {
      postcss: {
        plugins: [autoprefixer as any],
      },
    },
  })
}
