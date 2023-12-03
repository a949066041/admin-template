<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import type { PropsOptions } from 'vexip-ui'

defineOptions({
  name: 'AppConfig',
})
const props = defineProps<{ title?: string }>()

useTitle(props.title)

const configPropsProvider: PropsOptions = {
  default: { clearable: true },
  linker: {
    type: 'primary',
  },
  form: {
    labelAlign: 'left',
  },
  formItem: {
    labelWidth: 80,
    span: 24,
    lg: 12,
  },
}

dayjs.locale('zh-cn')
</script>

<template>
  <ConfigProvider :props="configPropsProvider">
    <slot />
  </ConfigProvider>
</template>
