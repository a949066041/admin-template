import type { ConfigProviderProps } from 'naive-ui'
import { createGlobalState } from '@vueuse/core'
import { useConfigStore } from '@yy-admin/common-core'
import { createDiscreteApi, darkTheme, dateZhCN, lightTheme, zhCN } from 'naive-ui'
import { computed } from 'vue'

export const useAppConfigStore = createGlobalState(() => {
  const configStore = useConfigStore()
  const configProps = computed<ConfigProviderProps>(() => ({
    theme: !configStore.isDark ? lightTheme : darkTheme,
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
