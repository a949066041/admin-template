<script lang="ts" setup>
import { ref } from 'vue'
import { EchartsView, pieOption, smallLineOrBarOption } from '@yy-admin/components-chart'
import { UserApi } from '@yy-admin/common-apis'
import { useLazyBox, LazyBox } from '@yy-admin/components-base'
import dayjs from 'dayjs'

defineOptions({
  name: 'Home',
})

const data = ref(1)
const chart1 = ref<InstanceType<typeof EchartsView>>()
const chart2 = ref<InstanceType<typeof EchartsView>>()
const chart3 = ref<InstanceType<typeof EchartsView>>()
const chart4 = ref<InstanceType<typeof EchartsView>>()
const { config, handleRenderCb } = useLazyBox({
  test: {
    service() {
      return UserApi.page({ size: 1 })
    },
    render() {
      console.log(Array.from({ length: 30 }, (_, i) => ({ name: dayjs().subtract(i, 'day').format('YYYY-MM-DD'), value: Math.random() * 100 })).reverse())
      chart1.value?.render(smallLineOrBarOption(Array.from({ length: 30 }, (_, i) => ({ name: dayjs().subtract(i, 'day').format('YYYY-MM-DD'), value: Math.random() * 100 })).reverse()))
    },
  },
  test2: {
    service() {
      return UserApi.page({ size: 1 })
    },
    render() {
      chart2.value?.render(smallLineOrBarOption(Array.from({ length: 30 }, (_, i) => ({ name: dayjs().subtract(i, 'day').format('YYYY-MM-DD'), value: Math.random() * 100 })).reverse(), { type: 'bar' }))
    },
  },
  test3: {
    service() {
      return UserApi.page({ size: 1 })
    },
    render() {
      chart3.value?.render(smallLineOrBarOption(Array.from({ length: 30 }, (_, i) => ({ name: dayjs().subtract(i, 'day').format('YYYY-MM-DD'), value: Math.random() * 100 })).reverse(), { type: 'bar' }))
    },
  },
  test4: {
    service() {
      return UserApi.page({ size: 1 })
    },
    render() {
      chart4.value?.render(smallLineOrBarOption(Array.from({ length: 30 }, (_, i) => ({ name: dayjs().subtract(i, 'day').format('YYYY-MM-DD'), value: Math.random() * 100 })).reverse()))

    },
  },
}, data)
</script>

<template>
  <div>
    <n-grid :x-gap="12">
      <n-gi  :span="6">
        <n-card  hoverable>
          <div class=" flex justify-between">
            <span class=" text-black op65">总销售额</span>
            <i-ph:question-light />
          </div>
          <div class=" text-3xl">
            <n-number-animation :from="0" :to="12039" show-separator />
          </div>
          <lazy-box :height="46" title="测试" v-bind="config.test" @render="handleRenderCb">
            <EchartsView class=" h-200px w-full" ref="chart1" />
          </lazy-box>
        </n-card>
      </n-gi>
      <n-gi  :span="6">
        <n-card  hoverable>
          <div class=" flex justify-between">
            <span class=" text-black op65">总销售额</span>
            <i-ph:question-light />
          </div>
          <div class=" text-3xl">
            <n-number-animation :from="0" :to="12039" show-separator />
          </div>
          <lazy-box :height="46" title="测试" v-bind="config.test2" @render="handleRenderCb">
            <EchartsView class=" h-200px w-full" ref="chart2" />
          </lazy-box>
        </n-card>
      </n-gi>
      <n-gi  :span="6">
        <n-card  hoverable>
          <div class=" flex justify-between">
            <span class=" text-black op65">总销售额</span>
            <i-ph:question-light />
          </div>
          <div class=" text-3xl">
            <n-number-animation :from="0" :to="12039" show-separator />
          </div>
          <lazy-box :height="46" title="测试" v-bind="config.test3" @render="handleRenderCb">
            <EchartsView class=" h-200px w-full" ref="chart3" />
          </lazy-box>
        </n-card>
      </n-gi>
      <n-gi  :span="6">
        <n-card  hoverable>
          <div class=" flex justify-between">
            <span class=" text-black op65">总销售额</span>
            <i-ph:question-light />
          </div>
          <div class=" text-3xl">
            <n-number-animation :from="0" :to="12039" show-separator />
          </div>
          <lazy-box :height="46" title="测试" v-bind="config.test4" @render="handleRenderCb">
            <EchartsView class=" h-200px w-full" ref="chart4" />
          </lazy-box>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
  <div class=" flex flex-col h-full overflow-hidden">
    <n-button
      :key="1"
      @click="data++"
    >
      test
    </n-button>
  </div>
</template>
