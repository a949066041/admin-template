<script lang="ts" setup>
import { useColorMode, useResizeObserver } from '@vueuse/core'
import * as echarts from 'echarts'
import { computed, onActivated, ref, watch } from 'vue'

defineOptions({
  name: 'EchartsView',
})

const chartRef = ref<HTMLElement | null>(null)

const mode = useColorMode()
const renderChartTheme = computed(() => mode.value === 'dark' ? 'dark' : 'light')
let chartInstance: echarts.ECharts | null = null
let cacheOptions: echarts.EChartsCoreOption | null = null

function render(options: echarts.EChartsCoreOption) {
  if (!chartInstance)
    chartInstance = echarts.init(chartRef.value!, renderChartTheme.value)

  cacheOptions = { ...options, backgroundColor: 'transparent' }
  chartInstance.setOption(cacheOptions)
}

watch(renderChartTheme, () => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }

  if (cacheOptions)
    render(cacheOptions)
})

onActivated(() => {
  window.dispatchEvent(new Event('resize'))
})

useResizeObserver(chartRef, () => {
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
