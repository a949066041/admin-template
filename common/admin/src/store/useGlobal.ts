import { createGlobalState } from '@vueuse/shared'
import { useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => useStorage<{ theme: 'light' | 'dark'; collapsed: boolean }>('yy-glob', {
    theme: 'light',
    collapsed: false,
  }),
)
