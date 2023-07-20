<script setup lang="ts">
import { type IRole, RoleApi } from '@yy-admin/apis'
import { useTable } from '@yy-web/business-use'
import type { YyTableColumns } from '@yy-admin/common-components'
import { createColumns as cT } from '@yy-admin/common-components'
import { computed } from 'vue'

const {
  searchForm, dataSource, total,
  current, loading, limit, resetTable, searchTable,
} = useTable<{ blurry: string }>({
  api: RoleApi.pageApi,
})

const columns = computed<YyTableColumns<keyof IRole>[]>(() => [
  cT('name', '名称'),
  cT('dataScope', '数据权限'),
  cT('level', '角色级别'),
  cT('description', '描述'),
  cT('createTime', '创建日期'),
  cT('action', '操作', true),
])

defineOptions({
  name: 'SystemRole',
})
</script>

<template>
  <YyTable
    v-model:current="current"
    v-model:limit="limit"
    :total="total" :loading="loading"
    :columns="columns" :data-source="dataSource"
  >
    <template #search>
      <yy-search :model="searchForm" @submit="searchTable" @search="searchTable" @reset="resetTable">
        <a-form-item>
          <a-input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
        </a-form-item>
      </yy-search>
    </template>

    <template #action>
      <a-button>修改</a-button>
    </template>
  </YyTable>
</template>
