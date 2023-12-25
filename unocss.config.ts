import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  safelist: [
    'center-absolute',
  ],
  presets: [
    presetAttributify({ /* preset options */}),
    presetUno(),
    presetIcons({
      collections,
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
