import { resolve } from 'node:path'
import path from 'path';


import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import autoprefixer from 'autoprefixer'
import UnoCSS from 'unocss/vite'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LibConfigOption {
  lib_name: string
}

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
        external: ['vue', 'ant-design-vue'],
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
    ],
    css: {
      postcss: {
        plugins: [autoprefixer as any],
      },
    },
  })
}
