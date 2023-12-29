<script lang="ts" setup>
import { LogsApi } from '@yy-admin/common-apis'
import type {
  ILogsEntity,
  ILogsRecord,
  ILogsTableParams,
} from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { createColumn as cT } from '@yy-admin/components-naive'
import type { YyTableColumns } from '@yy-admin/components-naive'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'

defineOptions({
  name: 'Log',
})

const {
  dataSource,
  limit,
  current,
  total,
  loading,
  searchForm,
  searchTable,
  resetTable,
} = useTable<ILogsTableParams, ILogsEntity>({
  apiAction: LogsApi.page,
  delAction: LogsApi.del,
})

function initJobForm() {
  return initFormObj(['username'] as const, {
    username: '',
  }) as ILogsEntity
}

const { handleInitForm } = useCurdForm<ILogsEntity>({
  initFormFn: initJobForm,
  saveAction: LogsApi.save,
  putAction: LogsApi.put,
  findIdAction: LogsApi.findId,
  afterSave: searchTable,
})
const columns = computed<YyTableColumns<keyof ILogsRecord>[]>(() => [
  cT('username', '用户名'),
  cT('requestIp', 'IP'),
  cT('address', 'IP来源'),
  cT('description', '描述'),
  cT('browser', '浏览器'),
  cT('time', '请求耗时', true),
  cT('createTime', '创建时间'),
])
</script>

<template>
  <YyTable
    v-bind="{ total, loading, dataSource }"
    v-model:current="current"
    v-model:limit="limit"
    :columns="columns"
  >
    <template #search>
      <yy-search
        :model="searchForm"
        @submit="searchTable"
        @search="searchTable"
        @reset="resetTable"
      >
        <n-form-item>
          <n-input
            v-model:value="searchForm.blurry"
            placeholder="请输入关键字查询"
          />
        </n-form-item>
      </yy-search>
    </template>

    <template #tools>
      <n-space>
        <n-button type="primary" @click="handleInitForm()">
          清空
        </n-button>
        <n-button type="primary" @click="LogsApi.download({})">
          导出
        </n-button>
      </n-space>
    </template>
    <template #time="{ text }">
      <n-tag type="info">
        {{ text }}ms
      </n-tag>
    </template>
  </YyTable>
</template>
