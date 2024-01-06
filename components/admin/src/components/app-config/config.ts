import type { ConfigProviderProps } from 'naive-ui'
import { createDiscreteApi, darkTheme, dateZhCN, lightTheme, zhCN } from 'naive-ui'
import { useConfigStore } from '@yy-admin/common-core'
import { computed } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useAppConfigStore = createGlobalState(() => {
  const { isDark } = useConfigStore()
  const configProps = computed<ConfigProviderProps>(() => ({
    theme: !isDark.value ? lightTheme : darkTheme,
    locale: zhCN,
    size: 'small',
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
