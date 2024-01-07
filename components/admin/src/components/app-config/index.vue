<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { NThemeEditor } from 'naive-ui'
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
    <NThemeEditor>
      <n-config-provider v-bind="configProps" preflight-style-disabled>
        <n-global-style />
        <n-message-provider>
          <slot />
        </n-message-provider>
      </n-config-provider>
    </NThemeEditor>
  </n-loading-bar-provider>
</template>
