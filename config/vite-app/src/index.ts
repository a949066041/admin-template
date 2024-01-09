import { defineConfig, mergeConfig } from 'vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import VueDevTools from 'vite-plugin-vue-devtools'
import commonViteConfig from '@yy-admin/config-vite'
import { YyAntdComponents } from './resolver-components'

export default () => mergeConfig(commonViteConfig({
  report: true,
  resolvers: [VantResolver(), YyAntdComponents()],
}), defineConfig({
  build: {
    rollupOptions: {
      output: {
        // manualChunks 配置
        manualChunks: {
          // 将 React 相关库打包成单独的 chunk 中
          naive: ['naive-ui'],
          // 将 Lodash 库的代码单独打包
          lodash: ['lodash-es'],
          // 将组件库的代码打包
          echarts: ['echarts'],
          // vue
          vue: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://110.41.161.81/',
        rewrite: path => path.replace(/^\/api\//, ''),
        changeOrigin: true,
      },
      '/avatar': {
        target: 'http://110.41.161.81/',
      },
    },
  },
  plugins: [
    VueDevTools(),
  ],
}))
