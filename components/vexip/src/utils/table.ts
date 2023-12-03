import type { TableBaseColumn } from 'vexip-ui'
import { last } from 'lodash-es'

export type IColumnType<T extends string = string> = {
  key: T
  width?: number | string
  children?: IColumnType[]
  renderSlot: boolean
} & Omit<TableBaseColumn, 'key'>

export interface IConfigTable extends TableBaseColumn {
  [key: string]: any
}

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
  config: Omit<TableBaseColumn, 'key'>,
  slots?: boolean
): IColumnType<T>

export function createColumn<T extends string>(
  dataIndex: T,
  title: string,
  config: Omit<TableBaseColumn, 'key'>,
  width: number,
  slots?: boolean
): IColumnType<T>

export function createColumn<T extends string = string>(
  key: TableBaseColumn['key'],
  name: TableBaseColumn['name'],
  ...args: any[]
): IColumnType<T> {
  let [config = {}, width] = args
  const column = {} as IColumnType<T>
  const normalizeArg = normalizeTableArgs(config, width)
  config = normalizeArg.config
  width = normalizeArg.width || undefined

  Object.assign(column, config || {})
  return {
    ...column,
    key: key as T,
    name,
    width,
    renderSlot: !!last(args),
  }
}

export type YyTableColumns<T extends string> = ReturnType<typeof createColumn<T | 'action'>>
