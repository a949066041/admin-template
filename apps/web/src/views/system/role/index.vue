<script setup lang="ts">
import { type IRole, type IRoleParams, RoleApi } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { type YyTableColumns, createColumn as cT } from '@yy-admin/components-antdv'
import { computed, ref } from 'vue'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import type { Rule } from 'ant-design-vue/es/form'

defineOptions({
  name: 'SystemRole',
})

const {
  searchForm, dataSource, total, delDataRow,
  current, loading, limit, resetTable, searchTable,
} = useTable<{ blurry: string; id: string }>({
  apiAction: RoleApi.page,
  delAction: RoleApi.del,
})

function initUserForm() {
  return initFormObj(['name', 'level', 'dataScope', 'description'], {
  }) as IRoleParams
}

const { formModel, visible, modalTitle, handleInitForm, saveLoading, handleSaveForm, findLoading, formRef } = useCurdForm<IRoleParams>({
  initFormFn: initUserForm,
  saveAction: RoleApi.save,
  putAction: RoleApi.put,
  findIdAction: RoleApi.findId,
  afterSave: searchTable,
})

const rules = ref<Partial<Record<keyof IRoleParams, Rule[] | Rule>>>({
  name: [
    { required: true, message: '请输入角色名称', trigger: 'change' },
  ],
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
      <a-button type="primary" @click="handleInitForm()">
        新增
      </a-button>
    </template>

    <template #action="{ record }">
      <a-button type="link" @click="handleInitForm(record.id)">
        修改
      </a-button>
      <a-button type="link" @click="delDataRow(record.id)">
        删除
      </a-button>
    </template>

    <a-modal v-model:open="visible" :title="modalTitle" :confirm-loading="saveLoading" @ok="handleSaveForm">
      <a-form ref="formRef" v-loading="findLoading" :rules="rules" :model="formModel">
        <a-form-item name="name" label="角色名称">
          <a-input v-model:value="formModel.name" placeholder="请输入角色名称" />
        </a-form-item>
        <a-form-item name="level" label="角色级别">
          <a-input-number v-model:value="formModel.level" placeholder="请输入角色级别" />
        </a-form-item>
        <a-form-item name="dataScope" label="数据范围">
          <a-input v-model:value="formModel.dataScope" placeholder="请输入角色" />
        </a-form-item>
        <a-form-item name="description" label="描述信息">
          <a-textarea v-model:value="formModel.description" placeholder="请输入描述信息" />
        </a-form-item>
      </a-form>
    </a-modal>
  </YyTable>
</template>
