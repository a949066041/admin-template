<script lang="ts" setup>
import { useVModels } from '@vueuse/core'

interface IYyTable {
  columns: any[]
  dataSource: any[]
  loading: boolean
  current?: number
  limit?: number
  total?: number
}

const props = withDefaults(defineProps<IYyTable>(), {
  page: 1,
  limit: 10,
})

const emit = defineEmits<{
  'update:current': [current: number]
  'update:limit': [limit: number]
}>()
const { limit, current } = useVModels(props, emit)

defineOptions({
  name: 'YyTable',
})
</script>

<template>
  <div class="yy-table">
    <slot name="search" />
    <div class="px-2 py-4 mt-2 bg-white">
      <a-table
        bordered
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
      />
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
