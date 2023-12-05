<script lang="ts" setup>
import { JobApi } from '@yy-admin/common-apis'
import type { IEntity, IJobEntity, IJobPageParams } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { createColumn as cT } from '@yy-admin/components-vexip'
import { YyDictSelect } from '@yy-admin/components-admin'
import type { VexipFormRules, YyTableColumns } from '@yy-admin/components-vexip'
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

const rules = ref<VexipFormRules<IJobEntity>>({
  name: [
    { required: true, message: '请输入名称' },
  ],
  jobSort: [
    { required: true, message: '请输入排序' },
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
        <FormItem>
          <Input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
        </FormItem>
      </yy-search>
    </template>

    <template #tools>
      <Button type="primary" @click="handleInitForm()">
        新增
      </Button>
      <Button type="primary" @click="JobApi.download({})">
        导出
      </Button>
    </template>

    <template #action="{ record }">
      <Linker @click="handleInitForm(record.id)">
        修改
      </Linker>

      <Linker @click="delDataRow(record.id)">
        删除
      </Linker>
    </template>

    <template #enabled="{ text, record }">
      <Switch v-model:value="record.enabled" @change="handleUpdateEnabled(record)" />
    </template>

    <Modal v-model:active="visible" :title="modalTitle" :loading="saveLoading" @confirm="handleSaveForm">
      <Form ref="formRef" v-loading="findLoading" :rules="rules" :model="formModel">
        <FormItem prop="name" label="名称">
          <Input v-model:value="formModel.name" placeholder="请输入" />
        </FormItem>
        <FormItem prop="jobSort" label="排序">
          <NumberInput v-model:value="formModel.jobSort" placeholder="请输入" />
        </FormItem>
        <FormItem prop="enabled" label="开启">
          <YyDictSelect v-model:value="formModel.enabled" type="radio" dict="job_status" transform="boolean" />
        </FormItem>
      </Form>
    </Modal>
  </YyTable>
</template>
