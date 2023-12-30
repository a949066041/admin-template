import { resolve } from 'node:path'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss'

import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  safelist: [
    'center-absolute',
  ],
  presets: [
    presetAttributify({ /* preset options */}),
    presetUno(),
    presetIcons({
      collections: {
        custom: FileSystemIconLoader(resolve('../../config/vite/src/svg'), svg => svg.replace('<svg ', '<svg fill="currentColor" ')),
      },
    }),
  ],
  shortcuts: {
    'center-absolute': '!absolute left-50% top-50% translate-[-50%]',
    'base-bg': 'bg-[#00b96b]',
  },
  transformers: [
    transformerDirectives({
      enforce: 'pre',
    }),
  ],
})
