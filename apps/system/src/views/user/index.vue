<script setup lang="ts">
import type { IDeptEntity, IJobEntity, IRoleEntity, IUserEntity, IUserRecord, IUserTableParams } from '@yy-admin/common-apis'
import type { NaiveFormRules, YyTableColumns } from '@yy-admin/components-naive'
import { UserApi } from '@yy-admin/common-apis'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import { isValidPhone } from '@yy-admin/common-utils'
import { YyDictSelect } from '@yy-admin/components-admin'
import { createColumn as cT } from '@yy-admin/components-naive'
import { useTable } from '@yy-web/use-curd-vue'
import { first } from 'lodash-es'
import { computed, ref, watch } from 'vue'
import { useDeptTree } from '../dept/useDeptTree'
import { useInitUserPage } from './useInitUserPage'

defineOptions({
  name: 'User',
})

const { jobList, roleList, selectedDeps } = useInitUserPage()
const {
  searchForm,
  dataSource,
  confirmSearch,
  getTable,
  loading,
  pageConf,
  resetTable,
  delDataRow,
  searchTable,
} = useTable<IUserTableParams, IUserRecord>({
  apiAction: UserApi.page,
  delAction: UserApi.del,
  initSearch() {
    return {
      deptId: (first(selectedDeps.value) || undefined),
    }
  },
})

function initUserForm() {
  return initFormObj(['username', 'phone', 'nickName', 'email', 'gender', 'enabled', 'roles', 'jobs', 'dept', 'deptId'] as const, {
    roles: [],
    jobs: [],
  }) as IUserRecord & { roles: number[], jobs: number[], deptId: number }
}

const { deptTreeData: leftDeptTree, handleLazyDept: handleLeftLazyDept, filterInput } = useDeptTree(true)
const { deptTreeData, handleLazyDept, triggerDeptTree } = useDeptTree()
const { formModel, visible, modalTitle, handleInitForm, saveLoading, handleSaveForm, formRef } = useCurdForm<IUserRecord>({
  initFormFn: initUserForm,
  saveAction: UserApi.save,
  putAction: UserApi.put,
  findIdAction: UserApi.findId,
  afterSave: searchTable,
  beforeSave(saveData) {
    return {
      dept: {
        id: saveData.deptId,
      },
      roles: saveData.roles.map(id => ({ id })),
      jobs: saveData.jobs.map(id => ({ id })),
    }
  },
  afterDetail(result, isAdd) {
    if (!isAdd) {
      formModel.value.roles = (result!.roles as IRoleEntity[]).map(item => item.id)
      formModel.value.jobs = (result!.jobs as IJobEntity[]).map(item => item.id)
      formModel.value.deptId = (result?.dept as IDeptEntity).id
    }
    triggerDeptTree(!!isAdd, (result?.dept as IDeptEntity)?.id)
  },
})

const rules = ref<NaiveFormRules<ReturnType<typeof initUserForm>>>({
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
    type: 'number',
    message: '请输入',
    trigger: 'change',
  }],
  phone: [
    {
      required: true,
      trigger: 'change',
      validator(_rule, value) {
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

function handleChangeStatus(entity: IUserEntity) {
  confirmSearch('是否切换用户状态', () => {
    return UserApi.put({ ...entity, enabled: !entity.enabled }).finally(getTable)
  })
}

watch(selectedDeps, searchTable)

const columns = computed<YyTableColumns<keyof IUserRecord>[]>(() => [
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
      <n-input v-model:value="filterInput" class=" mb-3" placeholder="输入部门名称搜索">
        <template #prefix>
          <i class="i-icon-park-outline:search" />
        </template>
      </n-input>
      <n-tree
        v-model:selected-keys="selectedDeps"
        selectable
        label-field="name"
        key-field="id"
        :data="leftDeptTree"
        :on-load="handleLeftLazyDept"
        block-line
      />
    </n-gi>
    <n-gi :span="20">
      <YyTable
        v-bind="{ total: pageConf.total, loading, dataSource }"
        v-model:current="pageConf.current" v-model:limit="pageConf.limit"
        :columns="columns"
      >
        <template #search>
          <yy-search :model="searchForm" :loading="loading" @submit="searchTable" @search="searchTable" @reset="resetTable">
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
          <n-switch :value="text" @update:value="handleChangeStatus(record)" />
        </template>

        <template #action="{ record }">
          <n-button type="primary" quaternary @click="handleInitForm(record)">
            修改
          </n-button>
          <n-button type="error" quaternary @click="delDataRow(record.id)">
            删除
          </n-button>
        </template>
      </YyTable>
      <YyModal v-model:visible="visible" :title="modalTitle" :confirm-loading="saveLoading" @ok="handleSaveForm">
        <n-form ref="formRef" :model="formModel" :rules="rules">
          <n-form-item path="username" label="用户名">
            <n-input v-model:value="formModel.username" placeholder="请输入用户名" />
          </n-form-item>
          <n-form-item path="phone" label="电话">
            <n-input v-model:value="formModel.phone" placeholder="请输入电话" />
          </n-form-item>
          <n-form-item path="nickName" label="昵称">
            <n-input v-model:value="formModel.nickName" placeholder="请输入昵称" />
          </n-form-item>
          <n-form-item path="email" label="邮箱">
            <n-input v-model:value="formModel.email" placeholder="请输入邮箱" />
          </n-form-item>
          <n-form-item path="deptId" label="部门">
            <yy-tree-select
              v-model:value="formModel.deptId"
              :options="deptTreeData"
              :on-load="handleLazyDept"
              placeholder="请选择部门"
            />
          </n-form-item>
          <n-form-item path="jobs" label="岗位">
            <!-- eslint-disable-next-line vue/valid-v-model -->
            <yy-select v-model:value="(formModel.jobs as number[])" :options="jobList" multiple />
          </n-form-item>
          <n-form-item path="gender" label="性别">
            <YyDictSelect v-model:value="formModel.gender" type="radio" dict="sex_status" />
          </n-form-item>
          <n-form-item path="enabled" label="状态">
            <YyDictSelect v-model:value="formModel.enabled" type="radio" dict="user_status" transform="boolean" />
          </n-form-item>
          <n-form-item path="roles" label="角色">
            <!-- eslint-disable-next-line vue/valid-v-model -->
            <yy-select v-model:value="formModel.roles as number[]" :options="roleList" multiple />
          </n-form-item>
        </n-form>
      </YyModal>
    </n-gi>
  </n-grid>
</template>
