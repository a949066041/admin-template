import path from 'node:path'
import presetIcons from '@unocss/preset-icons'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
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

export const transFormConfig = [
  transformerDirectives({
    enforce: 'pre',
  }),
]

export function resolvePkgPath(currentPath: string, pkg: string) {
  return path.join(path.relative(currentPath, path.dirname(pkg)), scanFile)
    .replace(/\\/g, '/')
}
