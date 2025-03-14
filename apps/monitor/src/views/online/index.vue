<script lang="ts" setup>
import type { IEntity, IOnline } from '@yy-admin/common-apis'
import type { YyTableColumns } from '@yy-admin/components-naive'
import { OnLineApi } from '@yy-admin/common-apis'
import { createColumn as cT } from '@yy-admin/components-naive'
import { useTable } from '@yy-web/use-curd-vue'
import { computed } from 'vue'

defineOptions({
  name: 'MonitorOnline',
})

const {
  dataSource,
  pageConf,
  loading,
  searchForm,
  searchTable,
  resetTable,
  delDataRow,
} = useTable<IOnline & { username: string }>({
  apiAction: OnLineApi.page,
  delAction: OnLineApi.del,
})

const columns = computed<YyTableColumns<keyof IEntity<IOnline>>[]>(() => ([
  cT('userName', '用户名'),
  cT('dept', '部门'),
  cT('ip', '登录IP'),
  cT('address', '登录地点'),
  cT('browser', '浏览器'),
  cT('loginTime', '登录日期'),
  cT('action', '操作', { fixed: 'right' }, 300, true),
]))
</script>

<template>
  <YyTable
    v-bind="{ total: pageConf.total, loading, dataSource }"
    v-model:current="pageConf.current"
    v-model:limit="pageConf.limit"
    :columns="columns"
  >
    <template #search>
      <yy-search :model="searchForm" @submit="searchTable" @search="searchTable" @reset="resetTable">
        <n-form-item>
          <n-input v-model:value="searchForm.username" placeholder="输入用户名称查询" />
        </n-form-item>
      </yy-search>
    </template>

    <template #tools>
      <n-button type="primary" @click="OnLineApi.download({})">
        导出
      </n-button>
    </template>

    <template #action="{ record }">
      <n-button quaternary type="error" @click="delDataRow(record.key)">
        强退
      </n-button>
    </template>
  </YyTable>
</template>
