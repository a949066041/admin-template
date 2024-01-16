import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'

const gradientColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0,
  color: '#8ae88a', // 渐变起始颜色，浅绿色
}, {
  offset: 1,
  color: '#5eb85e', // 渐变结束颜色，稍深一些的绿色
}])

export interface ISmallLineOrBarData {
  value: number
  name: string
}

export interface ISmallLineOrBarOption {
  type: 'line' | 'bar'
}

export function smallLineOrBarOption(data: ISmallLineOrBarData[], options: Partial<ISmallLineOrBarOption> = {}) {
  options = {
    type: 'line',
    ...options,
  }
  return {
    color: [gradientColor],
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        data: data.map((item) => {
          return [item.name, item.value]
        }),
        type: options.type,
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: gradientColor, // 使用渐变颜色
          width: 2, // 线条宽度
          type: 'solid', // 线条类型
        },
        areaStyle: {
          color: gradientColor,
        },
      },
    ],
  } as EChartsOption
}
