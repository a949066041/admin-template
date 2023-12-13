<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { useAppConfigStore } from './config'

defineOptions({
  name: 'AppConfig',
})
const props = defineProps<{ title?: string }>()
const { configProps } = useAppConfigStore()
useTitle(props.title)
</script>

<template>
  <n-config-provider v-bind="configProps">
    <n-message-provider>
      <slot />
    </n-message-provider>
  </n-config-provider>
</template>
