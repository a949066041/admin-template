import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  experimental: {
    componentIslands: true,
  },
  features: {
    inlineStyles: false,
  },
  runtimeConfig: {
    public: {
      // eslint-disable-next-line node/prefer-global/process
      includeStars: !!process.env.KV_DRIVER,
    },
  },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'unplugin-icons/nuxt',
  ],
  build: {
    transpile:
      // eslint-disable-next-line node/prefer-global/process
      process.env.NODE_ENV === 'production' ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', 'juggle/resize-observer'] : ['@juggle/resize-observer'],
  },
  vite: {
    optimizeDeps: {
      // eslint-disable-next-line node/prefer-global/process
      include: process.env.NODE_ENV === 'development' ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone'] : [],
    },
    plugins: [
      Icons({
        autoInstall: true,
      }),
      AutoImport({
        imports: [
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
})
