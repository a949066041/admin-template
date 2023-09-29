<script setup lang="ts">
import { useTable } from '@yy-web/business-use'
import { type IUser, UserApi } from '@yy-admin/apis'
import { computed, watch } from 'vue'
import { createColumn as cT } from '@yy-admin/common-components'
import type { YyTableColumns } from '@yy-admin/common-components'
import { useCurdForm } from '../role/useCurdForm'
import { useDept } from './useDept'

defineOptions({
  name: 'SystemUser',
})

const {
  searchForm, dataSource, total, initForm,
  current, loading, limit, resetTable, searchTable,
} = useTable<{ blurry: string }, { deptId: string }>({
  apiAction: UserApi.page,
})

const { selectedDeps, handleGetDeptTree, deptTree, fieldNames, handleGetSuperior, deptAllTree } = useDept()
const {
  modelRef, visible, modalTitle, handleOpenDialog,
  validateInfos, saveLoading, handleSaveForm,
} = useCurdForm<IUser>({
  formRule: {
    username: [
      { required: true, message: 'xxx' },
    ],
  },
  saveAction(data) {
    return UserApi.save(data)
  },
  afterDetail() {
    if (modelRef.value.deptId)
      handleGetSuperior(modelRef.value.deptId)
  },
  putAction(data) {
    return UserApi.put(data)
  },
  afterSave() {
    searchTable()
  },
})

watch(selectedDeps, ([depId]) => {
  initForm.value.deptId = depId
  searchTable()
})

const columns = computed<YyTableColumns<keyof IUser>[]>(() => [
  cT('username', '用户名'),
  cT('nickName', '昵称'),
  cT('gender', '性别'),
  cT('phone', '电话'),
  cT('email', '邮箱'),
  cT(['dept', 'name'], '部门'),
  cT('enabled', '状态'),
  cT('createTime', '创建日期'),
  cT('action', '操作', true),
])
</script>

<template>
  <a-row>
    <a-col :span="6">
      <a-tree
        v-model:selectedKeys="selectedDeps"
        :load-data="handleGetDeptTree"
        :tree-data="deptTree"
        :field-names="fieldNames"
      />
    </a-col>
    <a-col :span="18">
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

        <template #action="{ record }">
          <a-button type="link" @click="handleOpenDialog(record)">
            修改
          </a-button>
        </template>
      </YyTable>
      <a-modal v-model:open="visible" :title="modalTitle" :confirm-loading="saveLoading" @ok="handleSaveForm">
        <a-form>
          <a-form-item v-bind="validateInfos.username" label="用户名">
            <a-input v-model:value="modelRef.username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item v-bind="validateInfos.phone" label="电话">
            <a-input v-model:value="modelRef.phone" placeholder="请输入电话" />
          </a-form-item>
          <a-form-item v-bind="validateInfos.nickName" label="昵称">
            <a-input v-model:value="modelRef.nickName" placeholder="请输入昵称" />
          </a-form-item>
          <a-form-item v-bind="validateInfos.email" label="邮箱">
            <a-input v-model:value="modelRef.email" placeholder="请输入邮箱" />
          </a-form-item>
          <a-form-item v-bind="validateInfos.dept" label="部门">
            <a-tree-select
              v-model:value="modelRef.deptId"
              :tree-data="deptAllTree"
              placeholder="请选择部门"
              tree-default-expand-all
              :field-names="fieldNames"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-col>
  </a-row>
</template>
