<script setup lang="ts">
import { useTable } from '@yy-web/business-use'
import { DictDetailApi, JobApi, RoleApi, UserApi } from '@yy-admin/common-apis'
import type { IJob, IRole, IUser, IUserParams } from '@yy-admin/common-apis'
import { computed, ref, watch } from 'vue'
import { type YyTableColumns, createColumn as cT } from '@yy-admin/components-antdv'
import { isValidPhone } from '@yy-admin/common-utils'
import type { Rule } from 'ant-design-vue/es/form'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import { useDept } from './useDept'

defineOptions({
  name: 'SystemUser',
})

const jobList = ref<IJob[]>([])
const statusList = ref<{ label: string; value: boolean }[]>([])
const roleList = ref<IRole[]>([])
const {
  searchForm, dataSource, total, initForm, confirmTable, getTable,
  current, loading, limit, resetTable, searchTable,
} = useTable<IUserParams & { blurry: string }, { deptId: string }>({
  apiAction: UserApi.page,
})

function initUserForm() {
  return initFormObj(['username', 'phone', 'nickName', 'email', 'deptId', 'jobs', 'gender', 'enabled', 'roles'], {
    jobs: [] as string[],
    roles: [] as string[],
  }) as IUserParams
}

const { selectedDeps, handleGetDeptTree, deptTree, fieldNames, handleGetSuperior, deptAllTree } = useDept()
const { formModel, visible, modalTitle, handleInitForm, saveLoading, handleSaveForm, findLoading, formRef } = useCurdForm<IUserParams>({
  initFormFn: initUserForm,
  saveAction: UserApi.save,
  putAction: UserApi.put,
  findIdAction: UserApi.findId,
  afterSave: searchTable,
  afterDetail(result) {
    handleGetSuperior(result?.deptId)
  },
})

const rules = ref<Partial<Record<keyof IUserParams, Rule[] | Rule>>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'change' },
  ],
  nickName: [
    { required: true, message: '请输入用户昵称', trigger: 'change' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'change' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'change' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' },
  ],
  deptId: [{
    required: true, message: '请输入', trigger: 'change',
  }],
  phone: [
    {
      required: true,
      trigger: 'change',
      validator: (_rule: Rule, value, callback) => {
        if (!value)
          return callback('请输入电话号码')

        else if (!isValidPhone(value))
          return callback('请输入正确的11位手机号码')

        else
          return Promise.resolve()
      },
    },
  ],
})

function handleChangeStatus(id: number) {
  confirmTable('是否切换用户状态', () => {
    return UserApi.switchEnabled(id).finally(getTable)
  })
}

DictDetailApi.getDictList('user_status').then((res) => {
  statusList.value = res.map(({ label, value }) => ({ label, value: value === 'true' }))
})

JobApi.page({ page: 0, size: 999, enabled: true }).then((res) => {
  jobList.value = res.content
})

RoleApi.all().then((res) => {
  roleList.value = res
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
  cT('enabled', '状态', true),
  cT('createTime', '创建日期'),
  cT('action', '操作', { fixed: 'right' }, true),
])
</script>

<template>
  <a-row :gutter="20">
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

        <template #tools>
          <a-button type="primary" @click="handleInitForm()">
            新增
          </a-button>
        </template>

        <template #enabled="{ text, record }">
          <a-switch :checked="text" @change="handleChangeStatus(record.id)" />
        </template>

        <template #action="{ record }">
          <a-button type="link" @click="handleInitForm(record.id)">
            修改
          </a-button>
        </template>
      </YyTable>
      <a-modal v-model:open="visible" :title="modalTitle" :confirm-loading="saveLoading" @ok="handleSaveForm">
        <a-spin :spinning="findLoading">
          <a-form ref="formRef" :model="formModel" :rules="rules">
            <a-form-item name="username" label="用户名">
              <a-input v-model:value="formModel.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item name="phone" label="电话">
              <a-input v-model:value="formModel.phone" type="number" placeholder="请输入电话" />
            </a-form-item>
            <a-form-item name="nickName" label="昵称">
              <a-input v-model:value="formModel.nickName" placeholder="请输入昵称" />
            </a-form-item>
            <a-form-item name="email" label="邮箱">
              <a-input v-model:value="formModel.email" placeholder="请输入邮箱" />
            </a-form-item>
            <a-form-item name="deptId" label="部门">
              <a-tree-select
                v-model:value="formModel.deptId"
                :tree-data="deptAllTree"
                :load-data="handleGetDeptTree"
                placeholder="请选择部门"
                tree-default-expand-all
                :field-names="fieldNames"
              />
            </a-form-item>
            <a-form-item name="jobs" label="岗位">
              <a-select v-model:value="formModel.jobs" :field-names="{ label: 'name', value: 'id' }" :options="jobList" mode="multiple" />
            </a-form-item>
            <a-form-item name="gender" label="性别">
              <a-radio-group v-model:value="formModel.gender" :options="[{ label: '男', value: '男' }, { label: '女', value: '女' }]" />
            </a-form-item>
            <a-form-item name="enabled" label="状态">
              <a-radio-group v-model:value="formModel.enabled" :options="statusList" :field-names="{ label: 'label', value: 'value' }" />
            </a-form-item>
            <a-form-item name="roles" label="角色">
              <a-select v-model:value="formModel.roles" :field-names="{ label: 'name', value: 'id' }" :options="roleList" mode="multiple" />
            </a-form-item>
          </a-form>
        </a-spin>
      </a-modal>
    </a-col>
  </a-row>
</template>
