<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { theme } from 'ant-design-vue'
import { computed } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import { useGlobalState } from '../../store/useGlobal'
import 'dayjs/locale/zh-cn'

const props = defineProps<{ title?: string }>()
const globalState = useGlobalState()

const algorithm = computed(() => globalState.value.theme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm)

function toggleTheme() {
  globalState.value.theme = globalState.value.theme === 'dark' ? 'light' : 'dark'
}
useTitle(props.title)

dayjs.locale('zh-cn')

defineOptions({
  name: 'AppConfig',
})
</script>

<template>
  <a-config-provider :locale="zhCN" :theme="{ algorithm: theme.compactAlgorithm }">
    <template #renderEmpty>
      <div style="text-align: center">
        <p>暂无数据哦～</p>
      </div>
    </template>
    <a-watermark content="@yy-admin">
      <slot />
    </a-watermark>
    <a-float-button-group trigger="click" type="primary" :style="{ right: '24px' }">
      <template #icon>
        Hi
      </template>
      <a-button @click="toggleTheme">
        dark
      </a-button>
    </a-float-button-group>
  </a-config-provider>
</template>
