import { createGlobalState } from '@vueuse/shared'
import { useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => useStorage('yy-glob', {
    theme: 'light',
    collapsed: false,
  }),
)
