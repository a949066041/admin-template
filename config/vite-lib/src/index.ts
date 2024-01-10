/* eslint-disable node/prefer-global/process */
import { resolve } from 'node:path'
import { defineConfig, mergeConfig } from 'vite'
import commonViteConfig from '@yy-admin/config-vite'
import dts from 'vite-plugin-dts'
import autoprefixer from 'autoprefixer'

interface LibConfigOption {
  lib_name: string
}

export default (options: LibConfigOption) => mergeConfig(commonViteConfig({
  report: true,
}), defineConfig({
  mode: 'production',
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(process.cwd(), 'src/index.ts'),
      name: options.lib_name,
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'vue',
        '@yy-admin/common-apis',
        '@yy-admin/common-core',
        '@yy-admin/common-utils',
        'vue-router',
        'naive-ui',
        'dayjs',
      ],
      output: {
        exports: 'named',
        globals: {
          'naive-ui': 'naiveUi',
          'vue': 'Vue',
          '@yy-admin/common-apis': 'yy-admin-common-apis',
          '@yy-admin/common-core': 'yy-admin-common-core',
          '@yy-admin/common-utils': 'yy-admin-common-utils',
          'vue-router': 'vue-router',
        },
      },
    },
  },
  plugins: [
    dts({
      rollupTypes: false,
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer as any],
    },
  },
}))
