<script lang="ts" setup>
import type { IJobEntity, IJobRecord, IJobTableParams } from '@yy-admin/common-apis'
import type { NaiveFormRules, YyTableColumns } from '@yy-admin/components-naive'
import { JobApi } from '@yy-admin/common-apis'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import { YyDictSelect } from '@yy-admin/components-admin'
import { createColumn as cT } from '@yy-admin/components-naive'
import { useTable } from '@yy-web/use-curd-vue'
import { computed, ref } from 'vue'

defineOptions({
  name: 'Job',
})

const {
  dataSource,
  pageConf,
  loading,
  searchForm,
  searchTable,
  resetTable,
  delDataRow,
  getTable,
  confirmSearch,
} = useTable<IJobTableParams, IJobEntity>({
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
  confirmSearch(
    `确定${entity.enabled ? '禁用' : '启用'}该记录吗？`,
    () => JobApi.put({ enabled: !entity.enabled, id: entity.id }).then(getTable),
  )
}

const columns = computed<YyTableColumns<keyof IJobRecord>[]>(() => ([
  cT('name', '名称'),
  cT('jobSort', '序号'),
  cT('enabled', '是否开启', true),
  cT('createTime', '创建时间'),
  cT('action', '操作', { fixed: 'right' }, 300, true),
]))
</script>

<template>
  <YyTable
    v-bind="{ total: pageConf.total, loading, dataSource }"
    v-model:current="pageConf.current"
    v-model:limit="pageConf.limit"
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
      <n-button quaternary type="primary" @click="handleInitForm(record)">
        修改
      </n-button>

      <n-button quaternary type="error" @click="delDataRow(record.id)">
        删除
      </n-button>
    </template>

    <template #enabled="{ text, record }">
      <n-switch :value="text" @update-value="handleUpdateEnabled(record)" />
    </template>

    <YyModal v-model:visible="visible" :title="modalTitle" class=" w-[600px]" :confirm-loading="saveLoading" @ok="handleSaveForm">
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
    </YyModal>
  </YyTable>
</template>
