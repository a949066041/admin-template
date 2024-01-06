<script lang="ts" setup>
import * as echarts from 'echarts'
import { onActivated, ref } from 'vue'
import { useEventListener } from '@vueuse/core'

defineOptions({
  name: 'EchartsView',
})

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

function render(options: echarts.EChartsCoreOption) {
  if (!chartInstance)
    chartInstance = echarts.init(chartRef.value!)

  chartInstance.setOption(options)
}

onActivated(() => {
  window.dispatchEvent(new Event('resize'))
})
useEventListener('resize', () => {
  if (chartInstance)
    chartInstance.resize()
})

defineExpose({
  chartInstance,
  render,
})
</script>

<template>
  <div ref="chartRef" class=" h-full w-full" />
</template>
