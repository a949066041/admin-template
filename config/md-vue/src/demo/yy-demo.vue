<script lang="ts" setup>
import { shallowRef } from 'vue'
import { DEMO_TAG } from '../md/constant'

// import DemoEditor from './vue-editor.vue'

defineOptions({
  name: DEMO_TAG,
})

defineProps<{ code: string, title: string, desc: string, highlightedCode: string }>()

const MONACO_EDITOR_OPTIONS = {
  minimap: {
    enabled: true,
    autohide: true,
  },
  fontSize: 14,
  lineNumbersMinChars: 7,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  wordBasedSuggestions: true,
  quickSuggestions: true,
  scrollbar: {
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
  },
  scrollPredominantAxis: false,
}

const editorRef = shallowRef()
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
const handleMount = editor => (editorRef.value = editor)

// const viewRef = ref<HTMLDivElement | null>(null)
</script>

<template>
  <div class=" bg-white border border-solid border-[#f0f0f0] rounded border-b  border-solid relative">
    <div class=" absolute top-[-12px] ml-2 z-12 bg-white font-bold">
      {{ title }}
    </div>
    <div class="px-3 py-4 border-b border-b-solid border-[#f0f0f0]">
      <slot />
      <!-- <div ref="viewRef" /> -->
    </div>
    <div class="relative py-2 px-4">
      <div>{{ desc }}</div>
    </div>
    <!-- <div v-html="decodeURIComponent(highlightedCode)" /> -->
    <vue-monaco-editor
      class=" !h-400px"
      :value="code"
      theme="vs-dark"
      language="html"
      :options="MONACO_EDITOR_OPTIONS"
      @mount="handleMount"
    />
    <!-- <DemoEditor :code="code" /> -->
  </div>
</template>
