import type { DataTableBaseColumn } from 'naive-ui'
import { last } from 'lodash-es'

export type IColumnType<T extends string = string> = {
  key: T
  width?: number | string
  children?: IColumnType[]
  renderSlot: boolean
} & Omit<DataTableBaseColumn, 'key'>

function normalizeTableArgs(baseConfig: any, baseWidth: any) {
  let width = baseWidth
  let config = baseConfig
  if (typeof baseConfig === 'number') {
    width = config
    config = {}
  }
  else if (typeof baseConfig === 'boolean') {
    config = {}
  }
  return { width: typeof width === 'boolean' ? undefined : width, config }
}

export function createColumn<T extends string>(
  dataIndex: T,
  title: string,
  slots?: boolean
): IColumnType<T>

export function createColumn<T extends string>(
  dataIndex: T,
  title: string,
  width: number,
  slots?: boolean
): IColumnType<T>

export function createColumn<T extends string>(
  dataIndex: T,
  title: string,
  config: Omit<DataTableBaseColumn, 'key'>,
  slots?: boolean
): IColumnType<T>

export function createColumn<T extends string>(
  dataIndex: T,
  title: string,
  config: Omit<DataTableBaseColumn, 'key'>,
  width: number,
  slots?: boolean
): IColumnType<T>

export function createColumn<T extends string = string>(
  key: T,
  name: DataTableBaseColumn['title'],
  ...args: any[]
): IColumnType<T> {
  let [config = {}, width] = args
  const column = {} as IColumnType<T>
  const normalizeArg = normalizeTableArgs(config, width)
  config = normalizeArg.config
  width = normalizeArg.width || 110

  Object.assign(column, config || {})
  return {
    resizable: true,
    minWidth: width,
    width,
    title: name,
    ...column,
    key: key as T,
    ellipsis: {
      tooltip: true,
    },
    renderSlot: typeof last(args) === 'boolean' ? last(args) : false,
  }
}

export type YyTableColumns<T extends string> = ReturnType<typeof createColumn<T | 'action'>>
