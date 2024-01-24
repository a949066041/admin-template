<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

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
const showCode = ref(false)
const code = computed(() => decodeURIComponent(props.source))
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
      <highlight-code class="k-docs-code" language="html" :code="code" />
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
