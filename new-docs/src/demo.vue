<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import {
  codeToHtml,
} from 'shikiji'

// `shikiji/core` entry does not include any themes or languages or the wasm binary.
import { getHighlighterCore } from 'shikiji/core'

// `shikiji/wasm` contains the wasm binary inlined as base64 string.
import getWasm from 'shikiji/wasm'

// directly import the theme and language modules, only the ones you imported will be bundled.
import nord from 'shikiji/themes/nord.mjs'

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
// const modules = import.meta.glob('../../../../example/**/*.svelte')
const el = ref()
onMounted(async () => {
  // const path = `../../../../example/${props.src}`
  // comp = await modules[path]()
})

const code = computed(() => decodeURIComponent(props.source))
const html = ref('')
watch(code, async (code) => {
  const highlighter = await getHighlighterCore({
    themes: [
    // instead of strings, you need to pass the imported module
      nord,
      // or a dynamic import if you want to do chunk splitting
      import('shikiji/themes/material-theme-ocean.mjs'),
    ],
    langs: [
      import('shikiji/langs/vue.mjs'),
    ],
    loadWasm: getWasm,
  })

  await highlighter.loadTheme(import('shikiji/themes/vitesse-light.mjs'))

  html.value = highlighter.codeToHtml(code, {
    lang: 'javascript',
    theme: 'material-theme-ocean',
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
    <div>
      <div ref="el" />
    </div>
    <div
      v-if="showCode"
      class="border-t-1px border-t-solid border-slate-200 pt-2 flex justify-end items-center mt-4"
    >
      <div v-html="html" />
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
