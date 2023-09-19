<script lang="ts" setup>
import { useVModels } from '@vueuse/core'
import { computed } from 'vue'
import { type YyTableColumns } from '../../utils/table'
import S2Table from './s2/index.vue'

interface IYyTable {
  columns: YyTableColumns<string>[]
  dataSource: any[]
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

const renderSlotsKeys = computed(() => props.columns.filter(item => item.slots).map(item => item.dataIndex))

const { limit, current } = useVModels(props, emit)
</script>

<template>
  <div class="yy-table">
    <slot name="search" />
    <slot name="tools" />
    <div class="px-2 py-4 mt-2 bg-white dark:bg-[#001529]">
      <S2Table v-if="s2" class="w-full" :columns="columns" :data-source="dataSource" />
      <a-table
        v-else
        bordered
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
      >
        <template #bodyCell="{ column, record, index, text }">
          <template v-if="renderSlotsKeys.includes(column.key)">
            <slot v-bind="{ column, record, index, text }" :name="column.key" />
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
  </div>
</template>
