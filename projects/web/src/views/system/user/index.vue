<script setup lang="ts">
import { useTable } from '@yy-web/business-use'
import { useToggle } from '@vueuse/core'
import { UserApi } from '@yy-admin/apis'
import EditUser from './components/edit-user.vue'

defineOptions({
  name: 'SystemUser',
})

const {
  searchForm, dataSource, total,
  current, loading, limit, resetTable, searchTable,
} = useTable<{ blurry: string; a: string }>({
  apiAction: UserApi.page,
})

const [open, toggleOpen] = useToggle()

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
</script>

<template>
  <a-button @click="() => toggleOpen()">
    open
  </a-button>
  <YyTable
    v-model:current="current" v-model:limit="limit" :total="total"
    :loading="loading" :columns="columns" :data-source="dataSource"
  >
    <template #search>
      <yy-search :model="searchForm" @submit="searchTable" @search="searchTable" @reset="resetTable">
        <a-form-item>
          <a-input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
        </a-form-item>
      </yy-search>
    </template>
  </YyTable>
  <EditUser v-model:open="open" />
</template>
