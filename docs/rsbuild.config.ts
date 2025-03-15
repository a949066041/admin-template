import { mergeRsbuildConfig } from '@rsbuild/core'
import Shikiji from '@shikijs/markdown-it'
import rsConfig from '@yy-admin/config-rsbuild-app'
import Markdown from 'unplugin-vue-markdown/webpack'
import { VueLoaderPlugin } from 'vue-loader'
import { demoBlockPlugin } from './plugins/demo-md'

export default mergeRsbuildConfig(
  rsConfig({
    proxyApis: [
      ['/api', 'http://192.168.2.91:8000'],
      ['/avatar', 'http://192.168.2.91:8000'],
    ],
    plugins: [
      new VueLoaderPlugin(),
      Markdown({
        async markdownItSetup(md) {
          md.use(demoBlockPlugin)

          md.use(await Shikiji({
            themes: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          }))
        },
      }),
    ],
  }),
  {
    tools: {
      rspack: {
        module: {
          rules: [
            {
              test: /\.md$/,
              loader: 'vue-loader',
            },
          ],
        },
      },
    },
  },
)
