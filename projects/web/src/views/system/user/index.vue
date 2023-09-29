<script setup lang="ts">
import { useTable } from '@yy-web/business-use'
import { DictDetailApi, type IDictDetail, type IJob, type IRole, type IUser, JobApi, RoleApi, UserApi } from '@yy-admin/apis'
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

const { selectedDeps, handleGetDeptTree, deptTree, fieldNames, handleGetSuperior, deptAllTree } = useDept()
const {
  modelRef, visible, modalTitle, handleOpenDialog,
  validateInfos, saveLoading, handleSaveForm,
} = useCurdForm<IUser>({
  formRule: {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
    ],
    nickName: [
      { required: true, message: '请输入用户昵称', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
    ],
    email: [
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
    ],
    phone: [
      {
        required: true,
        trigger: 'blur',
        validator: (_rule: Rule, value) => {
          if (!value)
            return Promise.reject('请输入电话号码')

          else if (!isValidPhone(value))
            return Promise.reject('请输入正确的11位手机号码')

          else
            return Promise.resolve()
        },
      },
    ],
  },
  saveAction(data) {
    return UserApi.save(data)
  },
  afterDetail() {
    if (modelRef.value.deptId)
      handleGetSuperior(modelRef.value.deptId)

    modelRef.value.jobs = modelRef.value.jobs?.map(item => item.id!) as any
    modelRef.value.roles = modelRef.value.roles?.map(item => item.id!) as any
    modelRef.value.enabled = `${modelRef.value.enabled}` as any
  },
  putAction(data) {
    return UserApi.put(data)
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
  cT('action', '操作', true),
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

        <template #enabled="{ value }">
          <a-switch />
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
