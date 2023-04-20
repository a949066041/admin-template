<script setup lang="ts">
import { useTable } from '@yy-web/business-use'

const { searchForm, dataSource, total, current, loading, limit, resetTable, searchTable } = useTable<{ filter: string }>({
  api: '/auth/online',
})

const columns = [
  { title: '用户名', dataIndex: 'userName' },
  { title: '用户昵称', dataIndex: 'nickName' },
  { title: '部门', dataIndex: 'dept' },
  { title: '登录IP', dataIndex: 'ip' },
] as { title: string; dataIndex: string }[]
</script>

<template>
  <yy-layout class="about">
    <h1 text-200px>
      <a-form layout="inline" :model="searchForm">
        <a-form-item>
          <a-input v-model:value="searchForm.filter" placeholder="请输入关键字查询" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="searchTable">
            查询
          </a-button>
          <a-button @click="resetTable">
            重置
          </a-button>
        </a-form-item>
      </a-form>
      <a-table
        :loading="loading"
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
  </yy-layout>
</template>
