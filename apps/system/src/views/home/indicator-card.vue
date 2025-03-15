<script lang="ts" setup>
import { createReusableTemplate } from '@vueuse/core'
import { UserApi } from '@yy-admin/common-apis'
import { LazyBox, useLazyBox } from '@yy-admin/components-base'
import { EchartsView, smallLineOrBarOption } from '@yy-admin/components-chart'
import dayjs from 'dayjs'
import { ref } from 'vue'
import IndicatorText from '../../components/indicator-text.vue'
import IndicatorCardItem from './indicator-card-item.vue'

defineOptions({
  name: 'IndicatorCard',
})

const [CardDefineTemplate, CardReuseTemplate] = createReusableTemplate()

function genData() {
  return Array.from({ length: 30 }, (_, i) => ({ name: dayjs().subtract(i, 'day').format('YYYY-MM-DD'), value: Math.random() * 100 })).reverse()
}

const chart2 = ref<InstanceType<typeof EchartsView>>()
const chart3 = ref<InstanceType<typeof EchartsView>>()
const { config, handleRenderCb } = useLazyBox({
  test2: {
    service() {
      return UserApi.page({ size: 1 })
    },
    render() {
      chart2.value?.render(smallLineOrBarOption(genData().reverse()))
    },
  },
  test3: {
    service() {
      return UserApi.page({ size: 1 })
    },
    render() {
      chart3.value?.render(smallLineOrBarOption(genData().reverse()))
    },
  },
})
</script>

<template>
  <CardDefineTemplate>
    <div class=" flex items-end op88">
      <div class=" flex flex-wrap">
        <IndicatorText class=" mr-4" label="周同比" value="12%">
          <template #suffix-icon>
            <i class=" w-3 text-green-700 ml-1 i-teenyicons:up-solid" />
          </template>
        </IndicatorText>
        <IndicatorText label="日同比" value="11%">
          <template #suffix-icon>
            <i class=" w-3 text-red-700 ml-1 rotate-180 i-teenyicons:up-solid" />
          </template>
        </IndicatorText>
      </div>
    </div>
  </CardDefineTemplate>
  <div class=" home-card">
    <n-grid :x-gap="12" :y-gap="12" responsive="screen" cols="1 s:1 m:2 xl:4">
      <n-gi>
        <IndicatorCardItem title="总销售额" :value="12039" prefix="¥">
          <CardReuseTemplate class="min-h-11.5" />
          <template #footer>
            <IndicatorText label="日销售额" value="￥12,423" />
          </template>
        </IndicatorCardItem>
      </n-gi>
      <n-gi>
        <IndicatorCardItem title="访问量" :value="2323" prefix="¥">
          <LazyBox :height="46" title="测试" v-bind="config.test2" @render="handleRenderCb">
            <EchartsView ref="chart2" class=" h-200px w-full" />
          </LazyBox>
          <template #footer>
            <IndicatorText label="日访问量" value="1,234" />
          </template>
        </IndicatorCardItem>
      </n-gi>
      <n-gi>
        <IndicatorCardItem title="支付笔数" :value="3344">
          <LazyBox :height="46" title="测试" v-bind="config.test3" @render="handleRenderCb">
            <EchartsView ref="chart3" class=" h-200px w-full" />
          </LazyBox>
          <template #footer>
            <IndicatorText label="转化率" value="60%" />
          </template>
        </IndicatorCardItem>
      </n-gi>
      <n-gi>
        <IndicatorCardItem title="运营活动效果" :value="70" suffix="%">
          <div class=" min-h-11.5 flex items-center op88">
            <n-progress
              type="line"
              :percentage="70"
              indicator-placement="inside"
              processing
            />
          </div>
          <template #footer>
            <CardReuseTemplate />
          </template>
        </IndicatorCardItem>
      </n-gi>
    </n-grid>
  </div>
</template>
