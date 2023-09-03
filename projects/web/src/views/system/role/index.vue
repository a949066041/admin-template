<script setup lang="ts">
import { type IRole, RoleApi } from '@yy-admin/apis'
import { useTable } from '@yy-web/business-use'
import { type YyTableColumns, createColumns as cT } from '@yy-admin/common-components'
import { computed } from 'vue'
import { useCurdForm } from './useCurdForm'

defineOptions({
  name: 'SystemRole',
})

const {
  searchForm, dataSource, total, delDataRow,
  current, loading, limit, resetTable, searchTable,
} = useTable<{ blurry: string }>({
  apiAction: RoleApi.page,
  delAction: RoleApi.del,
})

const {
  modelRef, visible, modalTitle, handleOpenDialog,
  validateInfos, saveLoading, handleSaveForm,
} = useCurdForm<IRole>({
  formRule: {
    name: [
      { required: true, message: '请输入角色名称', trigger: 'blur' },
    ],
  },
  saveAction(data) {
    return RoleApi.save(data)
  },
  putAction(data) {
    return RoleApi.put(data)
  },
  afterSave() {
    searchTable()
  },
})

const columns = computed<YyTableColumns<keyof IRole>[]>(() => [
  cT('name', '名称'),
  cT('dataScope', '数据权限'),
  cT('level', '角色级别'),
  cT('description', '描述'),
  cT('createTime', '创建日期'),
  cT('action', '操作', true),
])
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

    <template #tools>
      <a-button type="primary" @click="handleOpenDialog()">
        新增
      </a-button>
    </template>

    <template #action="{ record }">
      <a-button type="link" @click="handleOpenDialog(record)">
        修改
      </a-button>
      <a-button type="link" @click="delDataRow(record.id)">
        删除
      </a-button>
    </template>
  </YyTable>

  <a-modal v-model:open="visible" :title="modalTitle" :confirm-loading="saveLoading" @ok="handleSaveForm">
    <a-form>
      <a-form-item v-bind="validateInfos.name" label="角色名称">
        <a-input v-model:value="modelRef.name" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item v-bind="validateInfos.level" label="角色级别">
        <a-input-number v-model:value="modelRef.level" placeholder="请输入角色级别" />
      </a-form-item>
      <a-form-item v-bind="validateInfos.dataScope" label="数据范围">
        <a-input v-model:value="modelRef.dataScope" placeholder="请输入角色" />
      </a-form-item>
      <a-form-item v-bind="validateInfos.description" label="描述信息">
        <a-textarea v-model:value="modelRef.description" placeholder="请输入描述信息" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
