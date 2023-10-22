<script lang="ts" setup>
defineOptions({
  name: 'DemoBlock',
})

const props = defineProps<{ code: string; title: string; desc: string; highlightedCode: string }>()
</script>

<template>
  <div class=" bg-white border border-solid border-blueGray rounded">
    <div class="px-3 py-4 border-b border-b-solid border-b-blueGray">
      <slot />
    </div>
    <div class="  relative py-2 px-4">
      <div class=" absolute top-[-12px] ml-2 z-12 bg-white font-bold">
        {{ title }}
      </div>
      <div>{{ desc }}</div>
    </div>
    <div v-html="decodeURIComponent(highlightedCode)" />
  </div>
</template>
