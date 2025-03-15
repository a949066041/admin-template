<script lang="ts" generic="T extends Record<string, any>" setup>
import type { DataTableBaseColumn } from 'naive-ui'
import type { INaiveConfig, YyTableColumns } from '../../utils'
import { useVModels } from '@vueuse/core'
import { NDataTable, NPagination } from 'naive-ui'
import { computed, inject } from 'vue'
import { provideSymbol } from '../../utils'

defineOptions({
  name: 'YyTable',
})

const props = withDefaults(defineProps<{
  columns: YyTableColumns<string>[]
  dataSource: T[]
  loading: boolean
  current?: number
  limit?: number
  total?: number
  pager?: boolean
  s2?: boolean
}>(), {
  pager: true,
  limit: 10,
  s2: false,
})

const emit = defineEmits<{
  'update:current': [current: number]
  'update:limit': [limit: number]
}>()

const slots = defineSlots<{
  default: any
  search: any
  tools: any
  [key: string]: (props: { record: T, $index: number, column: any, text: any }) => any
}>()

const { dict } = inject<INaiveConfig>(provideSymbol, {})

const renderPageCount = computed(() => {
  if (props.total === undefined)
    return 1

  return Math.ceil(props.total / props.limit)
})

const reColumns = computed(() => {
  return props.columns.map((item) => {
    const baseItem: Omit<DataTableBaseColumn, 'key'> = {}

    if (item.dict && dict)
      baseItem.render = row => dict(item.dict!, row[`${item.key}`] as string)

    if (item.renderSlot) {
      baseItem.render = (row, index) =>
        slots[item.key]?.({ record: row as T, $index: index, column: item, text: row[`${item.key}`] })
    }

    return {
      ...item,
      ...baseItem,
    }
  })
})

const totalWidth = computed(() => {
  return reColumns.value.reduce((prev, cur) => {
    return prev + ((cur.width || cur.minWidth || 0) as number)
  }, 0)
})

const { limit, current } = useVModels(props, emit)
</script>

<template>
  <div class="yy-table">
    <slot name="search" />
    <div class=" flex justify-end text-red-800">
      <slot name="tools" />
    </div>
    <div :class="[$slots && ' mt-2']">
      <NDataTable
        v-bind="$attrs"
        :loading="loading"
        size="small"
        :bordered="false"
        :columns="reColumns"
        :pagination="false"
        :data="dataSource"
        :scroll-x="totalWidth"
      />
      <NPagination
        v-if="pager"
        v-model:page="current"
        v-model:page-size="limit"
        class="mt-2 flex justify-end"
        :page-count="renderPageCount" show-quick-jumper show-size-picker
        :page-sizes="[10, 20, 50, 100, 200]"
      />
    </div>
    <slot />
  </div>
</template>
