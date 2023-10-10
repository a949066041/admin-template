<script setup lang="ts">
import { useTable } from '@yy-web/business-use'
import { DictDetailApi, JobApi, RoleApi, UserApi } from '@yy-admin/apis'
import type { IDictDetail, IJob, IRole, IUser, IWithPageUserData, Merge } from '@yy-admin/apis'
import { computed, ref, watch } from 'vue'
import { createColumn as cT } from '@yy-admin/common-components'
import type { YyTableColumns } from '@yy-admin/common-components'
import { isValidPhone } from '@yy-admin/common-utils'
import type { Rule } from 'ant-design-vue/es/form'
import { useCurdForm } from '../role/useCurdForm'
import { useDept } from './useDept'

defineOptions({
  name: 'SystemUser',
})

const jobList = ref<IJob[]>([])
const statusList = ref<IDictDetail[]>([])
const roleList = ref<IRole[]>([])
const {
  searchForm, dataSource, total, initForm,
  current, loading, limit, resetTable, searchTable,
} = useTable<{ blurry: string }, { deptId: string }>({
  apiAction: UserApi.page,
})

function initFormObj<
  T extends readonly string[],
  U extends Partial<Record<T[number], U[T[number]]>>,
>(keys: T, aliasObj: U) {
  return keys.reduce((base, item) => {
    const value: U[T[number]] | undefined = aliasObj[item as T[number]]
    base[item as T[number]] = value || undefined
    return base
  }, {} as Record<T[number], U[T[number]] | undefined>)
}

function initUserForm() {
  return initFormObj(['username', 'phone', 'nickName', 'email', 'deptId', 'jobs'] as const, {
    jobs: [] as string[],
  })
}

const { selectedDeps, handleGetDeptTree, deptTree, fieldNames, handleGetSuperior, deptAllTree } = useDept()
const {
  modelRef, visible, modalTitle, handleOpenDialog,
  validateInfos, saveLoading, handleSaveForm,
} = useCurdForm<IWithPageUserData>({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  formInitForm: initUserForm,
  formRule: {
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
  },
  saveAction(data) {
    return UserApi.save({
      ...data,
      jobs: (data.jobs || []).map(item => ({ id: item })),
      roles: (data.roles || []).map(item => ({ id: item })),
      dept: { id: data.deptId! },
    })
  },
  afterDetail(rowData: IUser) {
    if (modelRef.value.deptId)
      handleGetSuperior(modelRef.value.deptId)

    else
      modelRef.value.deptId = undefined

    modelRef.value.jobs = (rowData.jobs || []).map(item => item.id)
    modelRef.value.roles = (rowData.roles || []).map(item => item.id)
    modelRef.value.enabled = `${modelRef.value.enabled}`
  },
  putAction(data) {
    return UserApi.put({
      ...data,
      jobs: (data.jobs || []).map(item => ({ id: item })),
      roles: (data.roles || []).map(item => ({ id: item })),
      dept: { id: data.deptId! },
    })
  },
  afterSave() {
    searchTable()
  },
})

DictDetailApi.getDictList('user_status').then((res) => {
  statusList.value = res
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
          <a-button type="primary" @click="handleOpenDialog()">
            新增
          </a-button>
        </template>

        <template #enabled="{ text }">
          <a-switch :checked="`${text}`" un-checked-value="false" checked-value="true" />
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
            <a-input v-model:value="modelRef.phone" type="number" placeholder="请输入电话" />
          </a-form-item>
          <a-form-item v-bind="validateInfos.nickName" label="昵称">
            <a-input v-model:value="modelRef.nickName" placeholder="请输入昵称" />
          </a-form-item>
          <a-form-item v-bind="validateInfos.email" label="邮箱">
            <a-input v-model:value="modelRef.email" placeholder="请输入邮箱" />
          </a-form-item>
          <a-form-item v-bind="validateInfos.deptId" label="部门">
            <a-tree-select
              v-model:value="modelRef.deptId"
              :tree-data="deptAllTree"
              placeholder="请选择部门"
              tree-default-expand-all
              :field-names="fieldNames"
            />
          </a-form-item>
          <a-form-item v-bind="validateInfos.jobs" label="岗位">
            <a-select v-model:value="modelRef.jobs" :field-names="{ label: 'name', value: 'id' }" :options="jobList" mode="multiple" />
          </a-form-item>
          <a-form-item v-bind="validateInfos.gender" label="性别">
            <a-radio-group v-model:value="modelRef.gender" :options="[{ label: '男', value: '男' }, { label: '女', value: '女' }]" />
          </a-form-item>
          <a-form-item v-bind="validateInfos.enabled" label="状态">
            <a-radio-group v-model:value="modelRef.enabled" :options="statusList" :field-names="{ label: 'label', value: 'value' }" />
          </a-form-item>
          <a-form-item v-bind="validateInfos.roles" label="角色">
            <a-select v-model:value="modelRef.roles" :field-names="{ label: 'name', value: 'id' }" :options="roleList" mode="multiple" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-col>
  </a-row>
</template>
