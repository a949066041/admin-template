<script lang="ts" setup>
import { JobApi } from '@yy-admin/common-apis'
import type { IEntity, IJobEntity, IJobPageParams } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { createColumn as cT } from '@yy-admin/components-antdv'
import type { AntdFormRules, YyTableColumns } from '@yy-admin/components-antdv'
import { YyDict, initFormObj, useCurdForm } from '@yy-admin/common-core'

defineOptions({
  name: 'JobPage',
})

const {
  dataSource,
  limit,
  current,
  total,
  loading,
  searchForm,
  searchTable,
  resetTable,
  delDataRow,
  getTable,
  confirmTable,
} = useTable<IJobPageParams & IJobEntity>({
  apiAction: JobApi.page,
  delAction: JobApi.del,
})

function initJobForm() {
  return initFormObj(['name', 'jobSort', 'enabled'] as const, {
    enabled: false,
    jobSort: 0,
  }) as IJobEntity
}

const rules = ref<AntdFormRules<IJobEntity>>({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
  ],
  jobSort: [
    { required: true, message: '请输入排序', trigger: 'blur' },
  ],
})

const {
  formModel,
  visible,
  modalTitle,
  handleInitForm,
  saveLoading,
  handleSaveForm,
  findLoading,
  formRef,
} = useCurdForm<IJobEntity>({
  initFormFn: initJobForm,
  saveAction: JobApi.save,
  putAction: JobApi.put,
  findIdAction: JobApi.findId,
  afterSave: searchTable,
})

function handleUpdateEnabled(entity: IJobEntity) {
  confirmTable(
    `确定${entity.enabled ? '禁用' : '启用'}该记录吗？`,
    () => JobApi.put({ enabled: !entity.enabled, id: entity.id }).then(getTable),
  )
}

const columns = computed<YyTableColumns<keyof IEntity<IJobEntity>>[]>(() => ([
  cT('name', '名称', 100),
  cT('jobSort', '序号'),
  cT('enabled', '是否开启', true),
  cT('createTime', '创建时间', 100),
  cT('action', '操作', { fixed: 'right' }, true),
]))
</script>

<template>
  <YyTable
    v-bind="{ total, loading, dataSource }"
    v-model:current="current"
    v-model:limit="limit"
    :columns="columns"
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
      <a-button type="primary" @click="JobApi.download({})">
        导出
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

    <template #enabled="{ text, record }">
      <a-switch :checked="text" @change="handleUpdateEnabled(record)" />
    </template>

    <a-modal v-model:open="visible" :title="modalTitle" :confirm-loading="saveLoading" @ok="handleSaveForm">
      <a-form ref="formRef" v-loading="findLoading" :rules="rules" :model="formModel">
        <a-form-item name="name" label="名称">
          <a-input v-model:value="formModel.name" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="jobSort" label="排序">
          <a-input-number v-model:value="formModel.jobSort" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="enabled" label="开启">
          <YyDict dict="job_status" transform="boolean">
            <template #default="{ loading: testLoading, dictValue }">
              <a-radio-group v-model:value="formModel.enabled" v-loading="testLoading">
                <a-radio v-for="item in dictValue" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
            </template>
          </YyDict>
        </a-form-item>
      </a-form>
    </a-modal>
  </YyTable>
</template>
