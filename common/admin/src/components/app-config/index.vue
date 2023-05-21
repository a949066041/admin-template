<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const props = defineProps<{ title?: string }>()
useTitle(props.title)

dayjs.locale('zh-cn')

defineOptions({
  name: 'AppConfig',
})
</script>

<template>
  <a-config-provider :locale="zhCN">
    <template #renderEmpty>
      <div style="text-align: center">
        <p>Data Not Found</p>
      </div>
    </template>
    <a-watermark content="@yy-admin">
      <slot />
    </a-watermark>
  </a-config-provider>
</template>
