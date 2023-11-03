import type { EChartsOption } from 'echarts'

export interface IPieData {
  value: number
  name: string
}

export function pieOption(data: IPieData[]) {
  return {
    series: [
      {
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data,
      },
    ],
  } as EChartsOption
}
