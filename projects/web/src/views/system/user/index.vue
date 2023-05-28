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
  { title: '用户昵称', dataIndex: 'nickName' },
  { title: '部门', dataIndex: ['dept', 'name'] },
]

defineOptions({
  name: 'SystemUser',
})
</script>

<template>
  <h1 text-200px>
    <yy-search :model="searchForm" @search="searchTable" @reset="resetTable">
      <a-form-item>
        <a-input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
      </a-form-item>
      <a-form-item>
        <yy-select v-model:value="searchForm.a" placeholder="请选择" :list="{ 0: 'test213123123123', 1: 'test212312321312123' }" />
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
      </a-form-item>
    </yy-search>
    <a-table
      v-loading="loading"
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
    />
    <a-pagination
      v-model:current="current"
      v-model:pageSize="limit"
      show-size-changer
      :total="total"
    />
  </h1>
</template>
