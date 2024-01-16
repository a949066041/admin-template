<script lang="ts" setup>
import { ref } from 'vue'
import { EchartsView, smallLineOrBarOption } from '@yy-admin/components-chart'
import { UserApi } from '@yy-admin/common-apis'
import { LazyBox, useLazyBox } from '@yy-admin/components-base'
import dayjs from 'dayjs'
import IndicatorText from '../../components/indicator-text.vue'

defineOptions({
  name: 'IndicatorCard',
})

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
  <div class=" home-card">
    <n-grid :x-gap="12" :y-gap="12" responsive="screen" cols="1 s:1 m:2 xl:4">
      <n-gi>
        <div class=" home-card__box">
          <div class=" flex justify-between">
            <span class=" op65">总销售额</span>
            <i-ph:question-light />
          </div>
          <div class=" text-3xl">
            ¥<n-number-animation :from="0" :to="12039" show-separator />
          </div>
          <div class=" min-h-11.5 flex items-end op88">
            <div class=" flex flex-wrap">
              <IndicatorText class=" mr-4" label="周同比" value="12%">
                <template #suffix-icon>
                  <i-teenyicons:up-solid class=" w-3 text-green-700 ml-1" />
                </template>
              </IndicatorText>
              <IndicatorText label="日同比" value="11%">
                <template #suffix-icon>
                  <i-teenyicons:up-solid class=" w-3 text-red-700 ml-1 rotate-180" />
                </template>
              </IndicatorText>
            </div>
          </div>
          <n-divider class="!my-2" />
          <IndicatorText label="日销售额" value="￥12,423" />
        </div>
      </n-gi>
      <n-gi>
        <div class=" home-card__box">
          <div class=" flex justify-between">
            <span class="  op65">访问量
            </span>
            <i-ph:question-light />
          </div>
          <div class=" text-3xl">
            <n-number-animation :from="0" :to="12039" show-separator />
          </div>
          <LazyBox :height="46" title="测试" v-bind="config.test2" @render="handleRenderCb">
            <EchartsView ref="chart2" class=" h-200px w-full" />
          </LazyBox>
          <n-divider class="!my-2" />
          <IndicatorText label="日访问量" value="1,234" />
        </div>
      </n-gi>
      <n-gi>
        <div class=" home-card__box">
          <div class=" flex justify-between">
            <span class="  op65">支付笔数
            </span>
            <i-ph:question-light />
          </div>
          <div class=" text-3xl">
            <n-number-animation :from="0" :to="3344" show-separator />
          </div>
          <LazyBox :height="46" title="测试" v-bind="config.test3" @render="handleRenderCb">
            <EchartsView ref="chart3" class=" h-200px w-full" />
          </LazyBox>
          <n-divider class="!my-2" />
          <IndicatorText label="转化率" value="60%" />
        </div>
      </n-gi>
      <n-gi>
        <div class=" home-card__box">
          <div class=" flex justify-between">
            <span class="  op65">运营活动效果</span>
            <i-ph:question-light />
          </div>
          <div class=" text-3xl">
            <n-number-animation :from="0" :to="70" show-separator />%
          </div>
          <div class=" min-h-11.5 flex items-center op88">
            <n-progress
              type="line"
              :percentage="70"
              indicator-placement="inside"
              processing
            />
          </div>
          <n-divider class="!my-2" />
          <div class=" flex items-end op88">
            <div class=" flex flex-wrap">
              <IndicatorText class=" mr-4" label="周同比" value="12%">
                <template #suffix-icon>
                  <i-teenyicons:up-solid class=" w-3 text-green-700 ml-1" />
                </template>
              </IndicatorText>
              <IndicatorText label="日同比" value="11%">
                <template #suffix-icon>
                  <i-teenyicons:up-solid class=" w-3 text-red-700 ml-1 rotate-180" />
                </template>
              </IndicatorText>
            </div>
          </div>
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>

<style lang="less" scoped>
.home-card {
  &__box {
    @apply px-24px pt-20px pb-8px rounded-xl
      shadow-[0_1px_2px_0_rgba(0,0,0,0.03),0_1px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_0_rgba(0,0,0,0.02)]
      border
      border-solid
      dark:border-color-[rgba(255,255,255,0.09)]
      border-color-[rgb(239,239,245)];
  }
}
</style>
