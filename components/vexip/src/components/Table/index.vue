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

const renderSlotsKeys = computed(() => props.columns.filter(item => item.renderSlot).map(item => item.dataIndex))

const { limit, current } = useVModels(props, emit)
</script>

<template>
  <div class="yy-table">
    <slot name="search" />
    <slot name="tools" />
    <div class="px-2 py-4 mt-2 bg-white dark:bg-[#001529]">
      <Table
        bordered
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        size="small"
      >
        <TableColumn v-for="item of renderSlotsKeys" :key="item" :id-key="item">
          <template #default="{ row, column, rowIndex }">
            <slot v-bind="{ record: row, column, index: rowIndex, text: dataSource[rowIndex][`${item}`] }" :name="item" />
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
