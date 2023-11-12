<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { theme } from 'ant-design-vue'
import { computed } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import { useGlobalState } from '../../store/useGlobal'
import 'dayjs/locale/zh-cn'

defineOptions({
  name: 'AppConfig',
})
const props = defineProps<{ title?: string }>()
const { globStore, toggleTheme } = useGlobalState()

const algorithm = computed(() => globStore.value.theme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm)

useTitle(props.title)

dayjs.locale('zh-cn')
</script>

<template>
  <a-config-provider
    :locale="zhCN" :theme="{
      algorithm,
      token: {
        colorPrimary: '#00b96b',
        colorLink: '#00b96b',
      },
      inherit: false,
    }"
  >
    <a-app :modal="{ centered: true }">
      <a-watermark content="@yy-test">
        <slot />
      </a-watermark>
      <a-float-button-group trigger="click" type="primary" :style="{ right: '24px' }">
        <template #icon>
          Hi
        </template>
        <a-button @click="toggleTheme">
          {{ globStore.theme === 'dark' ? 'light' : 'dark' }}
        </a-button>
      </a-float-button-group>
    </a-app>
    <template #renderEmpty>
      <div style="text-align: center">
        <p>暂无数据哦～</p>
      </div>
    </template>
  </a-config-provider>
</template>
