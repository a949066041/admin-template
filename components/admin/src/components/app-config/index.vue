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
  <n-loading-bar-provider>
    <n-config-provider v-bind="configProps" preflight-style-disabled>
      <n-message-provider>
        <!-- <n-watermark
          content="洋洋得意"
          cross
          selectable
          :font-size="16"
          :line-height="16"
          :width="192"
          :height="128"
          :x-offset="12"
          :y-offset="28"
          :rotate="-15"
        > -->
        <slot />
        <!-- </n-watermark> -->
      </n-message-provider>
    </n-config-provider>
  </n-loading-bar-provider>
</template>
