import { setup } from '@css-render/vue3-ssr'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // eslint-disable-next-line node/prefer-global/process
  if (process.server) {
    const { collect } = setup(nuxtApp.vueApp)
    const originalRenderMeta = nuxtApp.ssrContext?.renderMeta
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    nuxtApp.ssrContext = nuxtApp.ssrContext || {}
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    nuxtApp.ssrContext.renderMeta = () => {
      if (!originalRenderMeta) {
        return {
          headTags: collect(),
        }
      }
      const originalMeta = originalRenderMeta()
      if ('then' in originalMeta) {
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        return originalMeta.then((resolvedOriginalMeta) => {
          return {
            ...resolvedOriginalMeta,
            headTags: resolvedOriginalMeta.headTags + collect(),
          }
        })
      }
      else {
        return {
          ...originalMeta,
          headTags: originalMeta.headTags + collect(),
        }
      }
    }
  }
})
