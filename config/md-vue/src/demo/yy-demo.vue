<script lang="ts" setup>
import { DEMO_TAG } from '../md/constant'

// import DemoEditor from './vue-editor.vue'

defineOptions({
  name: DEMO_TAG,
})

defineProps<{ code: string; title: string; desc: string;highlightedCode: string }>()
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
    <div v-html="decodeURIComponent(highlightedCode)" />
    <!-- <DemoEditor :code="code" /> -->
  </div>
</template>
