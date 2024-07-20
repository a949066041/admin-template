import * as path from 'node:path'
import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  content: {
    filesystem: [
      './src/**/*.{html,js,ts,jsx,tsx,vue}',
      path.join(path.dirname(require.resolve('@yy-admin/components-admin')), '/**/*.{html,js,ts,jsx,tsx,vue}'),
    ]
    ,
  },
  presets: [
    presetIcons({
      autoInstall: true,
      prefix: 'i-',
    }),
    presetUno(),
    presetAttributify({ /* preset options */}),
  ],
})
