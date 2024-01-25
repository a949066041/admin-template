<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { getHighlighterCore } from 'shikiji/core'

import getWasm from 'shikiji/wasm'

// import { useClipboard } from '@vueuse/core'
// import { KMessage } from '@ikun-ui/message'

const props = defineProps({
  src: {
    type: String,
  },
  github: {
    type: String,
  },
  source: {
    type: String,
    default: '',
  },
})

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
const html = ref('')
watch(code, async (code) => {
  const highlighter = await getHighlighterCore({
    themes: [
      import('shikiji/themes/vitesse-light.mjs'),
      import('shikiji/themes/vitesse-dark.mjs'),
    ],
    langs: [
      import('shikiji/langs/javascript.mjs'),
      import('shikiji/langs/vue.mjs'),
    ],
    loadWasm: getWasm,
  })

  html.value = highlighter.codeToHtml(code, {
    lang: 'javascript',
    theme: 'vitesse-dark',
  })
}, { immediate: true })

const showCode = ref(false)

const { copy } = useClipboard({ source: code.value })
function handleCopy() {
  copy()
}
</script>

<template>
  <div class="mt-6 border border-solid py-4 px-2 rounded border-slate-200">
    <div v-if="render" class=" w-full">
      <AsyncComp />
    </div>
    <div
      v-if="showCode"
      class="border-t-1px border-t-solid border-slate-200 pt-2 flex justify-end items-center mt-4"
    >
      <div class="w-full" v-html="html" />
    </div>
    <div
      class="border-t-1px border-t-solid border-slate-200 pt-2 flex justify-end items-center mt-4"
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
      <a
        :href="`https://github.com/ikun-svelte/ikun-ui/tree/main/components/${github}`"
        target="_blank"
        class="mx-2"
      >
        <div title="open in github" class="i-carbon-logo-github" style="color: #737373" />
      </a>
    </div>
  </div>
</template>
