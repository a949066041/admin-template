import { createGlobalState, useStorage } from '@vueuse/core'

export const useConfigStore = createGlobalState(() => {
  const theme = useStorage<'light' | 'dark'>('theme', 'dark')
  function handleSwitchTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    handleSwitchTheme,
    theme,
  }
})
