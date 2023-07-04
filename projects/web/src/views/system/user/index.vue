<script setup lang="ts">
import { useTable } from '@yy-web/business-use'

const {
  searchForm, dataSource, total,
  current, loading, limit, resetTable, searchTable,
} = useTable<{ blurry: string; a: string }>({
  api: '/api/users',
})

const columns = [
  { title: '用户名', dataIndex: 'username' },
  { title: '昵称', dataIndex: 'nickName' },
  { title: '性别', dataIndex: 'gender' },
  { title: '电话', dataIndex: 'phone' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '部门', dataIndex: ['dept', 'name'] },
  { title: '状态', dataIndex: 'enabled' },
  { title: '创建日期', dataIndex: 'createTime' },
]

defineOptions({
  name: 'SystemUser',
})
</script>

<template>
  <h1 text-200px>
    <YyTable
      v-model:current="current" v-model:limit="limit" :total="total"
      :loading="loading" :columns="columns" :data-source="dataSource"
    >
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
