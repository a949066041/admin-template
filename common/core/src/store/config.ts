import { createGlobalState, useColorMode, useEventListener, useStorage } from '@vueuse/core'
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

  const collapseMenu = useStorage<boolean>('collapseMenu', false, localStorage)
  function handleSwitchTheme() {
    isDark.value = !isDark.value
  }

  function handleToggleMenu(status?: boolean) {
    collapseMenu.value = typeof status === 'boolean' ? status : !collapseMenu.value
  }

  useEventListener('resize', () => {
    if (window.innerWidth < 960)
      handleToggleMenu(true)
  })

  return {
    handleSwitchTheme,
    isDark,
    handleToggleMenu,
    collapseMenu,
  }
})
