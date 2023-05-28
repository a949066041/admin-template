import {
  defineConfig, presetAttributify,
  presetUno, transformerDirectives,
} from 'unocss'

export default defineConfig({
  safelist: [
    'center-absolute',
  ],
  presets: [
    presetAttributify({ /* preset options */}),
    presetUno(),
  ],
  shortcuts: {
    'center-absolute': '!absolute left-50% top-50% translate-[-50%]',
  },
  transformers: [
    transformerDirectives(),
  ],
})
