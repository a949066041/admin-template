<script lang="ts" setup>
import type { IDict, IDictParams } from '@yy-admin/common-apis'
import { DictApi } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { type VexipFormRules, type YyTableColumns, createColumn as cT } from '@yy-admin/components-vexip'
import { computed, ref } from 'vue'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import DictDetail from './dict-detail.vue'

defineOptions({
  name: 'DictPage',
})
const { dataSource, limit, current, total, loading, searchForm, searchTable, resetTable, delDataRow } = useTable<{ blurry: string } & IDict>({
  apiAction: DictApi.page,
  delAction: DictApi.del,
})

function iniDictForm() {
  return initFormObj(['name', 'description'], {
  }) as IDictParams
}

const rules = ref<VexipFormRules<IDict>>({
  name: [
    { required: true, message: '请输入名称' },
  ],
})

const { formModel, visible, modalTitle, handleInitForm, saveLoading, handleSaveForm, findLoading, formRef } = useCurdForm<IDict>({
  initFormFn: iniDictForm,
  saveAction: DictApi.save,
  putAction: DictApi.put,
  findIdAction: DictApi.findId,
  afterSave: searchTable,
})

const dictName = ref<string>('')

const columns = computed<YyTableColumns<keyof IDict>[]>(() => ([
  cT('name', '名称'),
  cT('description', '名称'),
  cT('action', '操作', { fixed: 'right' }, true),
]))
</script>

<template>
  <Row :gap="16">
    <Column :span="10">
      <YyTable
        v-model:current="current"
        v-model:limit="limit"
        :total="total" :loading="loading"
        :columns="columns" :data-source="dataSource"
      >
        <template #search>
          <yy-search :model="searchForm" @submit="searchTable" @search="searchTable" @reset="resetTable">
            <FormItem label="关键字查询">
              <Input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
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

          <Linker @click="dictName = record.name">
            配置
          </Linker>

          <Linker @click="delDataRow(record.id)">
            删除
          </Linker>
        </template>

        <Modal v-model:active="visible" :title="modalTitle" :loading="saveLoading" @confirm="handleSaveForm">
          <Form ref="formRef" v-loading="findLoading" :rules="rules" :model="formModel">
            <FormItem prop="name" label="字典名称">
              <Input v-model:value="formModel.name" placeholder="请输入角字典名称" />
            </FormItem>
            <FormItem prop="level" label="描述">
              <Textarea v-model:value="formModel.description" placeholder="请输入描述" />
            </FormItem>
          </Form>
        </Modal>
      </YyTable>
    </Column>
    <a-col :span="14">
      <DictDetail v-model:dictKey="dictName" />
    </a-col>
  </Row>
</template>
