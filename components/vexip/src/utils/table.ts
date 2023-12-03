import type { TableColumnOptions } from 'vexip-ui'
import { last } from 'lodash-es'

export type IColumnType<T extends string | string[] = string> = {
  dataIndex: T
  width?: number | string
  children?: IColumnType[]
  renderSlot: boolean
} & TableColumnOptions

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
  return { width, config }
}

export function createColumn<T extends string | string[]>(
  dataIndex: T,
  title: string,
  slots?: boolean
): IColumnType<T>

export function createColumn<T extends string | string[]>(
  dataIndex: T,
  title: string,
  width: number,
  slots?: boolean
): IColumnType<T>

export function createColumn<T extends string | string[]>(
  dataIndex: T,
  title: string,
  config: TableColumnOptions,
  slots?: boolean
): IColumnType<T>

export function createColumn<T extends string | string[]>(
  dataIndex: T,
  title: string,
  config: TableColumnOptions,
  width: number,
  slots?: boolean
): IColumnType<T>

export function createColumn<T extends string | string[] = string>(
  dataIndex: T,
  title: TableColumnOptions['name'],
  ...args: any[]
): IColumnType<T> {
  let [config = {}, width] = args
  const column = {} as IColumnType<T>
  const normalizeArg = normalizeTableArgs(config, width)
  config = normalizeArg.config
  width = normalizeArg.width || 120

  Object.assign(column, config || {})
  return {
    ...column,
    key: `${dataIndex}`,
    dataIndex,
    width,
    renderSlot: !!last(args),
  }
}

export type YyTableColumns<T extends string | string[]> = ReturnType<typeof createColumn<T | 'action' | string[]>>
