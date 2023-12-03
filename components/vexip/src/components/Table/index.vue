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

const reColumns = computed(() => {
  return props.columns.map((item, order) => {
    return {
      ...item,
      order,
      renderSlot: item.renderSlot,
    }
  }).filter(item => !item.renderSlot)
})

const renderSlotsKeys = computed(() => {
  return props.columns.map((item, index) => ({
    ...item,
    renderSlot: item.renderSlot,
    index,
  })).filter(item => item.renderSlot)
})

const { limit, current } = useVModels(props, emit)
</script>

<template>
  <div class="yy-table">
    <slot name="search" />
    <slot name="tools" />
    <div class="px-2 py-4 mt-2 bg-white dark:bg-[#001529]">
      <Table
        v-loading="loading"
        :columns="reColumns"
        :data="dataSource"
        col-resizable
      >
        <TableColumn v-for="item of renderSlotsKeys" v-bind="item" :key="item.name" :id-key="item.name" :name="item.name" :order="item.index">
          <template #default="{ row, column, rowIndex }">
            <slot v-bind="{ record: row, column, index: rowIndex, text: dataSource[rowIndex][`${item.key}`] }" :name="item.key" />
          </template>
        </TableColumn>
      </Table>
      <Pagination
        v-model:active="current"
        v-model:page-size="limit"
        class="text-right mt-2"
        :plugins="['total', 'size', 'jump']"
        :total="total"
      />
    </div>
    <slot />
  </div>
</template>
