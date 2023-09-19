<script lang="ts" setup>
import { example1 } from '@yy-admin/common-three'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'Home',
})
const canvas = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  example1(canvas.value!)
})
</script>

<template>
  <canvas ref="canvas" class="w-full h-[800px]" />
</template>
