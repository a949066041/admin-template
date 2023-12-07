<script lang="ts" setup>
import { JobApi } from '@yy-admin/common-apis'
import type { IEntity, IJobEntity, IJobPageParams } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { createColumn as cT } from '@yy-admin/components-vexip'
import { YyDictSelect } from '@yy-admin/components-admin'
import type { NaiveFormRules, YyTableColumns } from '@yy-admin/components-vexip'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'

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

const rules = ref<NaiveFormRules<IJobEntity>>({
  name: [
    { required: true, message: '请输入名称', trigger: 'change' },
  ],
  jobSort: [
    { required: true, message: '请输入排序', trigger: 'blur', type: 'number' },
  ],
})

const {
  formModel,
  visible,
  modalTitle,
  handleInitForm,
  saveLoading,
  handleSaveForm,
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
  cT('name', '名称'),
  cT('jobSort', '序号'),
  cT('enabled', '是否开启', true),
  cT('createTime', '创建时间'),
  cT('action', '操作', { fixed: 'right' }, 300, true),
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
        <n-form-item>
          <n-input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
        </n-form-item>
      </yy-search>
    </template>

    <template #tools>
      <n-space>
        <n-button type="primary" @click="handleInitForm()">
          新增
        </n-button>
        <n-button type="primary" @click="JobApi.download({})">
          导出
        </n-button>
      </n-space>
    </template>

    <template #action="{ record }">
      <n-button quaternary type="primary" @click="handleInitForm(record.id)">
        修改
      </n-button>

      <n-button quaternary type="error" @click="delDataRow(record.id)">
        删除
      </n-button>
    </template>

    <template #enabled="{ text, record }">
      <n-switch :value="text" @update-value="handleUpdateEnabled(record)" />
    </template>

    <n-modal v-model:show="visible" :title="modalTitle" class=" w-[600px]" :loading="saveLoading" preset="card" @confirm="handleSaveForm">
      <div>
        <n-form ref="formRef" :rules="rules" :model="formModel">
          <n-form-item path="name" label="名称">
            <n-input v-model:value="formModel.name" placeholder="请输入" />
          </n-form-item>
          <n-form-item path="jobSort" label="排序">
            <n-input-number v-model:value="formModel.jobSort" placeholder="请输入" />
          </n-form-item>
          <n-form-item path="enabled" label="开启">
            <YyDictSelect v-model:value="formModel.enabled" type="radio" dict="job_status" transform="boolean" />
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <div class=" flex justify-end">
          <n-button @click="visible = false">
            取消
          </n-button>
          <n-button type="primary" @click="handleSaveForm">
            确定
          </n-button>
        </div>
      </template>
    </n-modal>
  </YyTable>
</template>
