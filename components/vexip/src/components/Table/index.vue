<script lang="ts" generic="T extends Record<string, any>" setup>
import { useVModels } from '@vueuse/core'
import { computed } from 'vue'
import type { YyTableColumns } from '../../utils/table'

interface IYyTable {
  columns: YyTableColumns<string>[]
  dataSource: T[]
  loading: boolean
  current?: number
  limit?: number
  total?: number
  s2?: boolean
}

defineOptions({
  name: 'YyTable',
})

const props = withDefaults(defineProps<IYyTable>(), {
  page: 1,
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

const renderPageCount = computed(() => {
  if (props.total === undefined)
    return 1

  return Math.ceil(props.total / props.limit)
})

const reColumns = computed(() => {
  return props.columns.map((item) => {
    const baseItem = item

    if (item.renderSlot) {
      baseItem.render = (row, index) =>
        slots[item.key]?.({ record: row as T, $index: index, column: item, text: props.dataSource[index][`${item.key}`] })
    }

    return baseItem
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
    <slot name="tools" />
    <div class="px-2 py-4 mt-2 bg-white dark:bg-[#001529]">
      <n-data-table
        :loading="loading"
        :columns="reColumns"
        :pagination="false"
        :data="dataSource"
        :scroll-x="totalWidth"
      />
      <n-pagination v-model:page="current" v-model:page-size="limit" :page-count="renderPageCount" show-quick-jumper />
    </div>
    <slot />
  </div>
</template>
