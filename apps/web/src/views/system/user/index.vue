<script setup lang="ts">
import { useTable } from '@yy-web/business-use'
import { UserApi } from '@yy-admin/common-apis'
import type { IUser, IUserParams, IUserSearchParams } from '@yy-admin/common-apis'
import { YyDictSelect } from '@yy-admin/components-admin'
import { type NaiveFormRules, type YyTableColumns, createColumn as cT } from '@yy-admin/components-naive'
import { isValidPhone } from '@yy-admin/common-utils'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import type { Merge } from 'type-fest'
import { useTreeDept } from './useTreeDept'
import { useInitUserPage } from './useInitUserPage'

defineOptions({
  name: 'SystemUser',
})

const { jobList, roleList } = useInitUserPage()
const {
  searchForm,
  dataSource,
  total,
  initForm,
  confirmTable,
  getTable,
  current,
  loading,
  limit,
  resetTable,
  delDataRow,
  searchTable,
} = useTable<Merge<IUser, IUserSearchParams>, { deptId: string }>({
  apiAction: UserApi.page,
  delAction: UserApi.del,
})

function initUserForm() {
  return initFormObj(['username', 'phone', 'nickName', 'email', 'deptId', 'jobs', 'gender', 'enabled', 'roles'], {
    jobs: [] as string[],
    roles: [] as string[],
  }) as IUserParams
}

const { selectedDeps, userDeptTree, handleGetLeftTree, userFormDeptTree, handleGetUserFormTreeDept, filterLeftTree } = useTreeDept()
const { formModel, visible, modalTitle, handleInitForm, saveLoading, handleSaveForm, formRef } = useCurdForm<IUserParams>({
  initFormFn: initUserForm,
  saveAction: UserApi.save,
  putAction: UserApi.put,
  findIdAction: UserApi.findId,
  afterSave: searchTable,
  afterDetail(result, isAdd) {
    handleGetUserFormTreeDept(!!isAdd, result?.deptId)
  },
})

const rules = ref<NaiveFormRules<IUserParams>>({
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
    required: true,
    message: '请输入',
    trigger: 'change',
  }],
  phone: [
    {
      required: true,
      trigger: 'change',
      validator(rule, value) {
        if (!value)
          return new Error('请输入电话号码')

        else if (!isValidPhone(value))
          return new Error('请输入正确的11位手机号码')

        else
          return true
      },
    },
  ],
})

function handleChangeStatus(id: number) {
  confirmTable('是否切换用户状态', () => {
    return UserApi.switchEnabled(id).finally(getTable)
  })
}

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
  cT('dept', '部门', true),
  cT('enabled', '状态', true),
  cT('createTime', '创建日期'),
  cT('action', '操作', { fixed: 'right' }, 200, true),
])
</script>

<template>
  <n-grid :x-gap="20">
    <n-gi :span="4">
      <n-input v-model:value="filterLeftTree" class=" mb-3" placeholder="输入部门名称搜索">
        <template #prefix>
          <i-icon-park-outline:search />
        </template>
      </n-input>
      <n-tree
        v-model:selected-keys="selectedDeps"
        selectable
        label-field="name"
        key-field="id"
        :data="userDeptTree"
        :on-load="handleGetLeftTree"
        block-line
      />
    </n-gi>
    <n-gi :span="20">
      <YyTable
        v-bind="{ total, loading, dataSource }"
        v-model:current="current" v-model:limit="limit"
        :columns="columns"
      >
        <template #search>
          <yy-search :model="searchForm" @submit="searchTable" @search="searchTable" @reset="resetTable">
            <n-form-item>
              <n-input v-model:value="searchForm.blurry" placeholder="输入名称或者邮箱搜索" />
            </n-form-item>
            <n-form-item>
              <YyRangeDatePicker v-model:range="searchForm.createTime" merge-range type="daterange" />
            </n-form-item>
            <n-form-item>
              <YyDictSelect v-model:value="searchForm.enabled" dict="user_status" placeholder="请选择状态" />
            </n-form-item>
          </yy-search>
        </template>

        <template #tools>
          <n-button type="primary" @click="handleInitForm()">
            新增
          </n-button>
        </template>

        <template #dept="{ record }">
          {{ record.dept?.name }}
        </template>

        <template #enabled="{ text, record }">
          <n-switch :value="text" @update:value="handleChangeStatus(record.id)" />
        </template>

        <template #action="{ record }">
          <n-button type="primary" quaternary @click="handleInitForm(record.id)">
            修改
          </n-button>
          <n-button type="error" quaternary @click="delDataRow(record.id)">
            删除
          </n-button>
        </template>
      </YyTable>
      <YyModal v-model:visible="visible" :title="modalTitle" :confirm-loading="saveLoading" @ok="handleSaveForm">
        <n-form ref="formRef" :model="formModel" :rules="rules">
          <n-form-item props="username" label="用户名">
            <n-input v-model:value="formModel.username" placeholder="请输入用户名" />
          </n-form-item>
          <n-form-item props="phone" label="电话">
            <n-input v-model:value="formModel.phone" placeholder="请输入电话" />
          </n-form-item>
          <n-form-item props="nickName" label="昵称">
            <n-input v-model:value="formModel.nickName" placeholder="请输入昵称" />
          </n-form-item>
          <n-form-item props="email" label="邮箱">
            <n-input v-model:value="formModel.email" placeholder="请输入邮箱" />
          </n-form-item>
          <n-form-item props="deptId" label="部门">
            <yy-tree-select
              v-model:value="formModel.deptId"
              :options="userFormDeptTree"
              :on-load="handleGetLeftTree"
              placeholder="请选择部门"
            />
          </n-form-item>
          <n-form-item props="jobs" label="岗位">
            <yy-select v-model:value="formModel.jobs" :options="jobList" multiple />
          </n-form-item>
          <n-form-item props="gender" label="性别">
            <YyDictSelect v-model:value="formModel.gender" type="radio" dict="sex_status" />
          </n-form-item>
          <n-form-item props="enabled" label="状态">
            <YyDictSelect v-model:value="formModel.enabled" type="radio" dict="user_status" transform="boolean" />
          </n-form-item>
          <n-form-item props="roles" label="角色">
            <yy-select v-model:value="formModel.roles" :options="roleList" multiple />
          </n-form-item>
        </n-form>
      </YyModal>
    </n-gi>
  </n-grid>
</template>
