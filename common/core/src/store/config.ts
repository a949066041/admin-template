import { createGlobalState, useColorMode, useStorage } from '@vueuse/core'
import { computed } from 'vue'

export const useConfigStore = createGlobalState(() => {
  const mode = useColorMode()
  const isDark = computed<boolean>({
    get() {
      return mode.value === 'dark'
    },
    set() {
      mode.value = isDark.value ? 'light' : 'dark'
    },
  })

  const collapseMenu = useStorage<boolean>('collapseMenu', false)
  function handleSwitchTheme() {
    isDark.value = !isDark.value
  }

  function handleToggleMenu() {
    collapseMenu.value = !collapseMenu.value
  }

  return {
    handleSwitchTheme,
    isDark,
    handleToggleMenu,
    collapseMenu,
  }
})
