import type { ConfigProviderProps } from 'naive-ui'
import { createDiscreteApi, darkTheme, dateZhCN, lightTheme, zhCN } from 'naive-ui'
import { computed, ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useAppConfigStore = createGlobalState(() => {
  const themeRef = ref<'light' | 'dark'>('light')
  const configProps = computed<ConfigProviderProps>(() => ({
    theme: themeRef.value === 'light' ? lightTheme : darkTheme,
    locale: zhCN,
    dateLocale: dateZhCN,
  }))

  const { message, notification, dialog, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps: configProps,
    },
  )

  return {
    configProps,
    message,
    dialog,
    notification,
    loadingBar,
  }
})
