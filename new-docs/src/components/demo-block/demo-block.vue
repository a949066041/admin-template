<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { type HighlighterCore, getHighlighterCore } from 'shiki/core'
import getWasm from 'shiki/wasm'

import { useClipboard } from '@vueuse/core'
import { useMessage } from 'naive-ui'
import { useConfigStore, useUserStore } from '@yy-admin/common-core'

const props = withDefaults(defineProps<{ src: string, source: string, auth?: boolean }>(), {
  auth: false,
})
const userStore = useUserStore()
const configStore = useConfigStore()
const message = useMessage()
const [render, toggleRender] = useToggle()
let AsyncComp: any = null
const modules = import.meta.glob('../../example/**/*.vue')
onMounted(async () => {
  const path = `../../example/${props.src}`
  if (!modules[path])
    throw new Error('not found comp')
  modules[path]().then((res) => {
    AsyncComp = (res as any).default
    toggleRender(true)
  })
})

const code = computed(() => decodeURIComponent(props.source))
let highlighter: HighlighterCore | null = null

const showCode = ref(false)
const html = ref('')
watch([showCode, () => configStore.isDark], async () => {
  if (showCode.value) {
    highlighter = await getHighlighterCore({
      themes: [
        import('shiki/themes/vitesse-light.mjs'),
        import('shiki/themes/vitesse-dark.mjs'),
      ],
      langs: [
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/vue.mjs'),
      ],
      loadWasm: getWasm,
    })
    html.value = highlighter.codeToHtml(code.value, {
      lang: 'javascript',
      theme: configStore.isDark ? 'vitesse-dark' : 'vitesse-light',
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
      :class="auth && !userStore.isLogin && 'auth'"
    >
      <div v-if="auth && userStore.isLogin || !auth">
        <AsyncComp />
      </div>
    </div>
    <div
      v-if="showCode"
      class="border-t-1px border-t-solid border-slate-200 pt-2 flex justify-end items-center mt-4"
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

<style>
.auth {
  @apply after:absolute after:left-0 after:right-0 after:top-0 after:bottom-0 after:bg-gray-1 after:dark:bg-[#ccc]
  after:text-black after:content-['授权后查看'] after:text-2xl after:flex after:items-center after:justify-center;
}
</style>
