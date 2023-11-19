<script lang="ts" setup>
import { ref } from 'vue'
import { EchartsView, pieOption } from '@yy-admin/components-chart'
import { UserApi } from '@yy-admin/common-apis'
import { useLazyBox } from '@yy-admin/components-base'

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
      return UserApi.findId(1)
    },
    render() {
      chart1.value?.render(pieOption([
        { value: Math.random() * 100, name: 'rose 1' },
        { value: Math.random() * 100, name: 'rose 2' },
        { value: Math.random() * 100, name: 'rose 3' },
        { value: Math.random() * 100, name: 'rose 5' },
        { value: Math.random() * 100, name: 'rose 6' },
        { value: Math.random() * 100, name: 'rose 7' },
        { value: Math.random() * 100, name: 'rose 4' },
        { value: Math.random() * 100, name: 'rose 8' },
      ]))
    },
  },
  test2: {
    service() {
      return UserApi.findId(2)
    },
    render() {
      chart2.value?.render(pieOption([
        { value: Math.random() * 100, name: 'rose 1' },
        { value: Math.random() * 100, name: 'rose 2' },
        { value: Math.random() * 100, name: 'rose 3' },
        { value: Math.random() * 100, name: 'rose 4' },
        { value: Math.random() * 100, name: 'rose 5' },
        { value: Math.random() * 100, name: 'rose 6' },
        { value: Math.random() * 100, name: 'rose 7' },
        { value: Math.random() * 100, name: 'rose 8' },
      ]))
    },
  },
  test3: {
    service() {
      return UserApi.findId(3)
    },
    render() {
      chart3.value?.render(pieOption([
        { value: Math.random() * 100, name: 'rose 1' },
        { value: Math.random() * 100, name: 'rose 2' },
        { value: Math.random() * 100, name: 'rose 3' },
        { value: Math.random() * 100, name: 'rose 4' },
        { value: Math.random() * 100, name: 'rose 5' },
        { value: Math.random() * 100, name: 'rose 6' },
        { value: Math.random() * 100, name: 'rose 7' },
        { value: Math.random() * 100, name: 'rose 8' },
      ]))
    },
  },
  test4: {
    service() {
      return UserApi.findId(4)
    },
    render() {
      chart4.value?.render(pieOption([
        { value: Math.random() * 100, name: 'rose 1' },
        { value: Math.random() * 100, name: 'rose 2' },
        { value: Math.random() * 100, name: 'rose 3' },
        { value: Math.random() * 100, name: 'rose 4' },
        { value: Math.random() * 100, name: 'rose 5' },
        { value: Math.random() * 100, name: 'rose 6' },
        { value: Math.random() * 100, name: 'rose 7' },
        { value: Math.random() * 100, name: 'rose 8' },
      ]))
    },
  },
}, data)
</script>

<template>
  <div class=" flex flex-col h-full overflow-hidden">
    <a-button
      :key="1"
      @click="data++"
    >
      test
    </a-button>
    <div class=" flex-1 overflow-hidden">
      <a-row :gutter="[20, 20]">
        <a-col :span="12">
          <lazy-box :height="800" title="测试" v-bind="config.test" @render="handleRenderCb">
            <EchartsView ref="chart1" />
          </lazy-box>
        </a-col>
        <a-col :span="12">
          <lazy-box :height="800" title="测试" v-bind="config.test2" @render="handleRenderCb">
            <EchartsView ref="chart2" />
          </lazy-box>
        </a-col>
        <a-col :span="12">
          <lazy-box :height="800" title="测试" v-bind="config.test3" @render="handleRenderCb">
            <EchartsView ref="chart3" />
          </lazy-box>
        </a-col>
        <a-col :span="12">
          <lazy-box :height="800" title="测试" v-bind="config.test4" @render="handleRenderCb">
            <EchartsView ref="chart4" />
          </lazy-box>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
