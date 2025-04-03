<script lang="ts" setup>
import type { ILogEntity } from '@yy-admin/common-apis'
import type { YyTableColumns } from '@yy-admin/components-naive'
import { LogsApi } from '@yy-admin/common-apis'
import { createColumn as cT } from '@yy-admin/components-naive'
import { useTable } from '@yy-web/use-curd-vue'
import { computed } from 'vue'

defineOptions({
  name: 'UserLog',
})

const {
  dataSource,
  pageConf,
  loading,
} = useTable<{ id: number }, ILogEntity>({
  apiAction: params => LogsApi.page(params),
})

const columns = computed<YyTableColumns<keyof ILogEntity>[]>(() => ([
  cT('description', '行为'),
  cT('requestIp', 'IP'),
  cT('address', 'IP来源'),
  cT('browser', '浏览器'),
  cT('time', '请求耗时', true),
  cT('createTime', '创建时间'),
]))
</script>

<template>
  <YyTable
    v-bind="{ total: pageConf.total, loading, dataSource }"
    v-model:current="pageConf.current"
    v-model:limit="pageConf.limit"
    :columns="columns"
  >
    <template #time="{ text }">
      {{ text }}ms
    </template>
  </YyTable>
</template>
