<script setup lang="ts">
import type { IRole } from '@yy-admin/apis'
import { useTable } from '@yy-web/business-use'
import { computed } from 'vue'

const {
  searchForm, dataSource, total,
  current, loading, limit, resetTable, searchTable,
} = useTable<{ blurry: string; a: string }>({
  api: '/api/roles',
})

const columns = computed<{ title: string; dataIndex: keyof IRole }[]>(() => [
  { title: '名称', dataIndex: 'name' },
  { title: '数据权限', dataIndex: 'dataScope' },
  { title: '角色级别', dataIndex: 'level' },
  { title: '描述', dataIndex: 'description' },
  { title: '创建日期', dataIndex: 'createTime' },
])

defineOptions({
  name: 'SystemRole',
})
</script>

<template>
  <h1 text-200px>
    <YyTable v-model:current="current" v-model:limit="limit" :total="total" :loading="loading" :columns="columns" :data-source="dataSource">
      <template #search>
        <yy-search :model="searchForm" @search="searchTable" @reset="resetTable">
          <a-form-item>
            <a-input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
          </a-form-item>
        </yy-search>
      </template>
    </YyTable>
  </h1>
</template>
