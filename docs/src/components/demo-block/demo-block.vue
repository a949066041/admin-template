<script lang="ts" setup>
import { useClipboard, useToggle } from '@vueuse/core'
import { useConfigStore, useUserStore } from '@yy-admin/common-core'

import { useMessage } from 'naive-ui'
import { codeToHtml } from 'shiki'
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{ src: string, source: string, auth?: boolean }>(), {
  auth: false,
})

const { isLogin } = useUserStore()
const configStore = useConfigStore()
const message = useMessage()
const [render, toggleRender] = useToggle()
let AsyncComp: any = null
const contextExample = import.meta.webpackContext('../../example', {
  // 是否搜索子目录
  recursive: true,
  regExp: /\.vue$/,
})

const modules = contextExample.keys().reduce((arr, value) => {
  arr[value.replace('./', '')] = contextExample(value)
  return arr
}, {} as Record<string, any>)

onMounted(async () => {
  if (!modules[props.src])
    throw new Error('not found comp')
  AsyncComp = modules[props.src].default
  toggleRender(true)
})

const code = computed(() => decodeURIComponent(props.source))

const showCode = ref(false)
const html = ref('')
watch([showCode, () => configStore.isDark.value], async () => {
  if (showCode.value) {
    html.value = await codeToHtml(code.value, {
      lang: 'vue',
      theme: configStore.isDark.value ? 'vitesse-dark' : 'vitesse-light',
    })
  }
}, { immediate: true })

const { copy } = useClipboard({ source: code.value })
function handleCopy() {
  copy()
  message.success('复制成功 😄')
}
</script>

<template>
  <div class="mt-6 border border-solid pt-4 px-2 rounded border-slate-200">
    <div
      v-if="render" class=" w-full min-h-30 relative"
      :class="auth && !isLogin && `after:absolute after:left-0 after:right-0 after:top-0 after:bottom-0 after:bg-gray-1 after:dark:bg-[#ccc]
  after:text-black after:content-['授权后查看'] after:text-2xl after:flex after:items-center after:justify-center`"
    >
      <div v-if="auth && isLogin || !auth">
        <AsyncComp />
      </div>
    </div>
    <div
      v-if="showCode"
      class="border-t-1px border-t-solid border-slate-200 pt-2 flex justify-end items-center mt-4 overflow-auto"
    >
      <div class="w-full" v-html="html" />
    </div>
    <div
      class="border-t-1px border-t-solid border-slate-200  flex justify-end items-center h-8"
    >
      <div
        title="show source code"
        class="i-carbon-code mx-2 cursor-pointer"
        style="color: #737373"
        @click="showCode = !showCode"
      />
      <div
        title="copy source code"
        class="i-carbon-copy-file mx-2 cursor-pointer"
        style="color: #737373"
        @click="handleCopy()"
      />
    </div>
  </div>
</template>
