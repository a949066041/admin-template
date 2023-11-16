import { createGlobalState } from '@vueuse/shared'
import { useDark, useStorage } from '@vueuse/core'
import { watch } from 'vue'

export const useGlobalState = createGlobalState(
  () => {
    const globStore = useStorage<{ theme: 'light' | 'dark'; collapsed: boolean }>('yy-glob', {
      theme: 'light',
      collapsed: false,
    })

    const dark = useDark()
    watch(dark, (val) => {
      globStore.value.theme = !val ? 'light' : 'dark'
    }, { immediate: true })

    function toggleTheme() {
      dark.value = globStore.value.theme !== 'dark'
    }

    return {
      globStore,
      toggleTheme,
    }
  },
)
