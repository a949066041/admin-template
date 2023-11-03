<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref } from 'vue';
import { tryOnMounted } from '@vueuse/core'
import { pieOption } from '../pie.option'

const chartRef = ref<echarts.ECharts | null>(null)


tryOnMounted(() => {
  chartRef.value?.setOption(pieOption([
    { value: 40, name: 'rose 1' },
    { value: 38, name: 'rose 2' },
    { value: 32, name: "rose 3" },
    { value: 30, name: 'rose 4' },
    { value: 28, name: 'rose 5' },
    { value: 26, name: 'rose 6' },
    { value: 22, name: 'rose 7' },
    { value: 18, name: 'rose 8' },
  ]))
})

defineOptions({
  name: 'EchartsView',
})
</script>

<template>
  <div ref="chartRef" class=" h-full w-full" />
</template>
