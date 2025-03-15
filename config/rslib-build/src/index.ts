import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import { defineConfig } from '@rslib/core'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/rspack'

export default () => defineConfig({
  plugins: [pluginVue(), pluginVueJsx()],
  source: {
    tsconfigPath: './tsconfig.json',
    entry: {
      index: './src/index.ts',
    },
  },
  tools: {
    rspack: {
      plugins: [
        Components({
          resolvers: [NaiveUiResolver()],
        }),
      ],
    },
  },
  lib: [
    {
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
    externals: [
      'vue',
      'vue-router',
      'naive-ui',
      'dayjs',
    ],
  },
})
