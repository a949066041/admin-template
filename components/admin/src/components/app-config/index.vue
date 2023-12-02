<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import dayjs from 'dayjs'
import { useGlobalState } from '../../store/useGlobal'
import 'dayjs/locale/zh-cn'

defineOptions({
  name: 'AppConfig',
})
const props = defineProps<{ title?: string }>()
const { globStore, toggleTheme } = useGlobalState()

useTitle(props.title)

dayjs.locale('zh-cn')
</script>

<template>
  <ConfigProvider>
    <slot />
    <Button class=" !fixed right-3 bottom-3" type="primary" @click="toggleTheme">
      {{ globStore.theme === 'dark' ? 'light' : 'dark' }}
    </Button>
  </ConfigProvider>
</template>
