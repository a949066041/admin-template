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
      <a-table
        bordered
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        size="small"
      >
        <template #bodyCell="{ column, record, index, text }">
          <template v-if="renderSlotsKeys.includes(column.key as string)">
            <slot v-bind="{ column, record, index, text } as { column: YyTableColumns<string>; record: T; index: number; text: T[typeof text] }" :name="column.key" />
          </template>
        </template>
      </a-table>
      <a-pagination
        v-model:current="current"
        v-model:page-size="limit"
        class="text-right mt-2"
        show-size-changer
        :total="total"
        :show-total="(total: number) => `总条数 ${total}`"
      />
    </div>
    <slot />
  </div>
</template>
