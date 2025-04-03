import type { ConfigProviderProps } from 'naive-ui'
import { createGlobalState } from '@vueuse/core'
import { useConfigStore } from '@yy-admin/common-core'
import { createDiscreteApi, darkTheme, dateZhCN, lightTheme, zhCN } from 'naive-ui'
import { computed } from 'vue'

export const useAppConfigStore = createGlobalState(() => {
  const { isDark } = useConfigStore()
  const configProps = computed<ConfigProviderProps>(() => ({
    theme: !isDark.value ? lightTheme : darkTheme,
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
