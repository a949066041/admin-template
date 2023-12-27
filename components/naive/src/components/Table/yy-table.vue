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
  pager?: boolean
  s2?: boolean
}

defineOptions({
  name: 'YyTable',
})

const props = withDefaults(defineProps<IYyTable>(), {
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
        slots[item.key]?.({ record: row as T, $index: index, column: item, text: row[`${item.key}`] })
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
    <div class=" flex justify-end">
      <slot name="tools" />
    </div>
    <div :class="[$slots && ' mt-2']">
      <n-data-table
        v-bind="$attrs"
        :loading="loading"
        size="small"
        :bordered="false"
        :columns="reColumns"
        :pagination="false"
        :data="dataSource"
        :scroll-x="totalWidth"
      />
      <n-pagination
        v-if="pager"
        v-model:page="current"
        v-model:page-size="limit"
        class="mt-2 flex justify-end"
        :page-count="renderPageCount" show-quick-jumper
      />
    </div>
    <slot />
  </div>
</template>
