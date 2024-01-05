import type { EChartsOption } from 'echarts'

export type ILineData = [string, number][]

export interface ILineOptions {
  max: number | null
}

export function lineOption(data: ILineData, options: Partial<ILineOptions> = {}) {
  options = {
    max: null,
    ...options,
  }
  return {
    color: ['#63e2b7'],
    xAxis: {
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {
      max: options.max,
      type: 'value',
    },
    series: [
      {
        data,
        smooth: true,
        type: 'line',
        areaStyle: {},
        symbolSize: 0,
      },
    ],
  } as EChartsOption
}
