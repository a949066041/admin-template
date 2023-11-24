/* eslint-disable node/prefer-global/process */
import { resolve } from 'node:path'
import { defineConfig, mergeConfig } from 'vite'
import commonViteConfig from '@yy-admin/config-vite'
import dts from 'vite-plugin-dts'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import autoprefixer from 'autoprefixer'

interface LibConfigOption {
  lib_name: string
}

export default (options: LibConfigOption) => mergeConfig(commonViteConfig({
  report: true,
  resolvers: [AntDesignVueResolver({ importStyle: false })],
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
      external: ['vue', 'ant-design-vue', 'ant-design-vue/es', '@yy-admin/common-apis', '@yy-admin/common-core', '@yy-admin/common-utils', 'vue-router'],
      output: {
        exports: 'named',
        globals: {
          'vue': 'Vue',
          'ant-design-vue': 'antd',
          'ant-design-vue/es': 'antd',
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
      rollupTypes: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer as any],
    },
  },
}))
