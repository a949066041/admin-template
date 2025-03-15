import type { UserConfig } from 'unocss'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import presetIcons from '@unocss/preset-icons'
import { presetAttributify, presetUno, transformerDirectives } from 'unocss'

export const scanFile = '/**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'

export const plugins = [
  presetUno(),
  presetAttributify({ /* preset options */}),
  presetIcons({
    collections: {
      custom: FileSystemIconLoader('../../config/vite/src/svg', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
    },
  }),
]

export const shortList = {
  'center-absolute': '!absolute left-50% top-50% translate-[-50%]',
  'base-bg': 'bg-[#00b96b]',
} as UserConfig['shortcuts']

export const transFormConfig = [
  transformerDirectives({
    enforce: 'pre',
  }),
] as UserConfig['transformers']

export function resolvePkgPath(currentPath: string, pkg: string) {
  return path.join(path.relative(currentPath, path.dirname(pkg)), scanFile)
    .replace(/\\/g, '/')
}

export const config: UserConfig = {
  shortcuts: {
    ...shortList,
  },
  presets: [
    presetUno(),
    presetAttributify({ /* preset options */}),
    presetIcons({
      collections: {
        custom: async () => {
          const content = await fs.readFile(
            path.resolve(__dirname, '..', 'scripts/custom.json'),
            'utf8',
          )
          return JSON.parse(content)
        },
      },
    }),
  ],
  transformers: [
    transformerDirectives({
      enforce: 'pre',
    }),
  ],
}
