import type { TableColumnProps } from 'ant-design-vue'

export function createColumns<T extends string | string[]>(
  dataIndex: T | 'action',
  title: TableColumnProps['title'],
  slots = false,
) {
  return {
    key: dataIndex,
    dataIndex,
    title,
    slots,
  }
}

export type YyTableColumns<T extends string | string[]> = ReturnType<typeof createColumns<T>>
