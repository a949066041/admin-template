<script setup lang="ts">
import { type IRole, type IRoleParams, RoleApi } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { type NaiveFormRules, type YyTableColumns, createColumn as cT } from '@yy-admin/components-naive'
import { computed, ref } from 'vue'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import MenuTree from './menu-tree.vue'

defineOptions({
  name: 'SystemRole',
})

interface IRoleSearch {
  blurry: string
  id: string
  menus: { id: number }[]
}

const {
  searchForm,
  dataSource,
  total,
  delDataRow,
  current,
  loading,
  limit,
  resetTable,
  searchTable,
} = useTable<IRoleSearch>({
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

const rules = ref<NaiveFormRules<IRoleParams>>({
  name: [
    { required: true, message: '请输入角色名称', trigger: 'change' },
  ],
})

const checkMenu = ref<number[]>([])
function handleSetMenuCheck(val: IRoleSearch['menus']) {
  checkMenu.value = val.map(item => item.id)
}

const columns = computed<YyTableColumns<keyof IRole>[]>(() => [
  cT('name', '名称'),
  cT('dataScope', '数据权限'),
  cT('level', '角色级别'),
  cT('description', '描述'),
  cT('createTime', '创建日期'),
  cT('action', '操作', { fixed: 'right' }, 220, true),
])
</script>

<template>
  <n-grid :x-gap="20">
    <n-gi :span="18">
      <YyTable
        v-model:current="current"
        v-model:limit="limit"
        :total="total" :loading="loading"
        :columns="columns" :data-source="dataSource"
      >
        <template #search>
          <yy-search :model="searchForm" @submit="searchTable" @search="searchTable" @reset="resetTable">
            <n-form-item>
              <n-input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
            </n-form-item>
          </yy-search>
        </template>

        <template #tools>
          <n-button type="primary" @click="handleInitForm()">
            新增
          </n-button>
        </template>

        <template #action="{ record }">
          <n-button type="primary" quaternary @click="handleInitForm(record.id)">
            修改
          </n-button>
          <n-button type="info" quaternary @click="handleSetMenuCheck(record.menus)">
            权限
          </n-button>
          <n-button type="error" quaternary @click="delDataRow(record.id)">
            删除
          </n-button>
        </template>

        <YyModal v-model:visible="visible" :title="modalTitle" :confirm-loading="saveLoading" @ok="handleSaveForm">
          <n-form ref="formRef" :loading="findLoading" :rules="rules" :model="formModel">
            <n-form-item prop="name" label="角色名称">
              <n-input v-model:value="formModel.name" placeholder="请输入角色名称" />
            </n-form-item>
            <n-form-item prop="level" label="角色级别">
              <n-input-number v-model:value="formModel.level" placeholder="请输入角色级别" />
            </n-form-item>
            <n-form-item prop="dataScope" label="数据范围">
              <n-input v-model:value="formModel.dataScope" placeholder="请输入角色" />
            </n-form-item>
            <n-form-item prop="description" label="描述信息">
              <n-input v-model:value="formModel.description" type="textarea" placeholder="请输入描述信息" />
            </n-form-item>
          </n-form>
        </YyModal>
      </YyTable>
    </n-gi>
    <n-gi :span="6">
      <MenuTree v-model:checked="checkMenu" />
    </n-gi>
  </n-grid>
</template>
