import { mergeRsbuildConfig } from '@rsbuild/core'
import { pluginMdx } from '@rsbuild/plugin-mdx'
import rsConfig from '@yy-admin/config-rsbuild-app'
import remarkGfm from 'remark-gfm'
import { remarkCodeSrc } from './plugins/remark'

export default mergeRsbuildConfig(
  rsConfig({
    proxyApis: [
      ['/api', 'http://192.168.2.91:8000'],
      ['/avatar', 'http://192.168.2.91:8000'],
    ],
  }),
  {
    plugins: [pluginMdx({
      mdxLoaderOptions: {
        jsxImportSource: 'vue',
        remarkPlugins: [
          [remarkCodeSrc, { basePath: '' }],
          remarkGfm,
        ],
      },
    })],
  },
)
