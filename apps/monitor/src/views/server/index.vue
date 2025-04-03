<script lang="ts" setup>
import type { IMonitorInfo } from '@yy-admin/common-apis'
import type { ILineData } from '@yy-admin/components-chart'
import { useIntervalFn, useToggle } from '@vueuse/core'
import { MonitorApi } from '@yy-admin/common-apis'
import { EchartsView, lineOption } from '@yy-admin/components-chart'
import { computed, onMounted, ref } from 'vue'

defineOptions({
  name: 'ServerMonitor',
})

const pageInfo = ref<IMonitorInfo | null>(null)
const cpuCharts = ref<InstanceType<typeof EchartsView> | null>(null)
const cpuData = ref<ILineData>([])
const memoryCharts = ref<InstanceType<typeof EchartsView> | null>(null)
const memoryData = ref<ILineData>([])

const systemInfo = computed(() => {
  if (!pageInfo.value)
    return []

  const { sys } = pageInfo.value
  return [
    { name: '系统', value: sys.os },
    { name: 'Ip', value: sys.ip },
    { name: '项目已不间断运行', value: sys.day },
  ]
})

const dashboardList = computed(() => {
  if (!pageInfo.value)
    return []

  const { cpu, memory, swap, disk } = pageInfo.value

  return [
    { tooltip: [cpu.name, cpu.package, cpu.core, cpu.logic], value: Number.parseFloat(cpu.used), title: 'CPU使用率', info: `${cpu.coreNumber}核心` },
    { tooltip: [`总量：${memory.total}`, `已使用：${memory.used}`, `空闲：${memory.available}`], value: Number.parseFloat(memory.usageRate), title: '内存使用率', info: `${memory.used}/${memory.total}` },
    { tooltip: [`总量：${swap.total}`, `已使用：${swap.used}`, `空闲：${swap.available}`], value: Number.parseFloat(swap.usageRate), title: '交换区使用率', info: `${swap.used}/${swap.total}` },
    { tooltip: [`总量：${disk.total}`, `空闲：${disk.available}`], value: Number.parseFloat(disk.usageRate), title: '磁盘使用率', info: `${disk.used}/${disk.total}` },
  ]
})

const [loading, toggleLoading] = useToggle()
function handleLoadPage() {
  MonitorApi.getInfo().then((res) => {
    pageInfo.value = res

    if (cpuData.value.length >= 10)
      cpuData.value.shift()

    if (memoryData.value.length >= 10)
      memoryData.value.shift()

    cpuData.value.push([res.time, Number.parseFloat(res.cpu.used)])
    memoryData.value.push([res.time, Number.parseFloat(res.memory.usageRate)])

    cpuCharts.value?.render(lineOption(cpuData.value, { max: 100 }))
    memoryCharts.value?.render(lineOption(memoryData.value, { max: 100 }))
  }).finally(() => toggleLoading(false))
}

useIntervalFn(handleLoadPage, 2000)

onMounted(() => {
  toggleLoading(true)
  handleLoadPage()
})
</script>

<template>
  <div v-loading="loading">
    <n-alert :show-icon="false" type="default" class=" mb-3 flex">
      <div v-for="item of systemInfo" :key="item.name" class="mr-2">
        {{ item.name }}: {{ item.value }}
      </div>
    </n-alert>
    <n-card
      title="状态"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <n-grid :x-gap="12">
        <n-gi v-for="item of dashboardList" :key="item.title" :span="6">
          <n-tooltip placement="top" trigger="hover">
            <template #trigger>
              <div class=" mx-auto w-full text-center flex flex-col items-center">
                {{ item.title }}
                <n-progress class=" my-2" type="dashboard" gap-position="bottom" :percentage="item.value" />
                {{ item.info }}
              </div>
            </template>
            <div v-for="tooltipItem of item.tooltip" :key="tooltipItem">
              {{ tooltipItem }}
            </div>
          </n-tooltip>
        </n-gi>
      </n-grid>
    </n-card>
    <n-grid :x-gap="12" class=" mt-3">
      <n-gi :span="12">
        <n-card
          title="CPU使用率监控"
          :segmented="{
            content: true,
            footer: 'soft',
          }"
        >
          <div class=" h-100">
            <EchartsView ref="cpuCharts" />
          </div>
        </n-card>
      </n-gi>
      <n-gi :span="12">
        <n-card
          title="内存使用率监控"
          :segmented="{
            content: true,
            footer: 'soft',
          }"
        >
          <div class=" h-100">
            <EchartsView ref="memoryCharts" />
          </div>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>
