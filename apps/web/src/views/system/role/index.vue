<script setup lang="ts">
import { type IRole, type IRoleParams, RoleApi } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { type VexipFormRules, type YyTableColumns, createColumn as cT } from '@yy-admin/components-vexip'
import { computed, ref } from 'vue'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import type { Rule } from 'ant-design-vue/es/form'
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

const rules = ref<VexipFormRules<IRoleParams>>({
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
  cT('action', '操作', true),
])
</script>

<template>
  <Row :gap="20">
    <Column :span="18">
      <YyTable
        v-model:current="current"
        v-model:limit="limit"
        :total="total" :loading="loading"
        :columns="columns" :data-source="dataSource"
      >
        <template #search>
          <yy-search :model="searchForm" @submit="searchTable" @search="searchTable" @reset="resetTable">
            <FormItem label="关键字">
              <a-input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
            </FormItem>
          </yy-search>
        </template>

        <template #tools>
          <Button type="primary" @click="handleInitForm()">
            新增
          </Button>
        </template>

        <template #action="{ record }">
          <Linker @click="handleInitForm(record.id)">
            修改
          </Linker>
          <Linker @click="handleSetMenuCheck(record.menus)">
            权限
          </Linker>
          <Linker @click="delDataRow(record.id)">
            删除
          </Linker>
        </template>

        <Modal v-model:active="visible" :title="modalTitle" :loading="saveLoading" @confirm="handleSaveForm">
          <Form ref="formRef" v-loading="findLoading" :rules="rules" :model="formModel">
            <FormItem prop="name" label="角色名称">
              <Input v-model:value="formModel.name" placeholder="请输入角色名称" />
            </FormItem>
            <FormItem prop="level" label="角色级别">
              <NumberInput v-model:value="formModel.level" placeholder="请输入角色级别" />
            </FormItem>
            <FormItem prop="dataScope" label="数据范围">
              <Input v-model:value="formModel.dataScope" placeholder="请输入角色" />
            </FormItem>
            <FormItem prop="description" label="描述信息">
              <Textarea v-model:value="formModel.description" placeholder="请输入描述信息" />
            </FormItem>
          </Form>
        </Modal>
      </YyTable>
    </Column>
    <a-col :span="6">
      <MenuTree :checked="checkMenu" />
    </a-col>
  </Row>
</template>
