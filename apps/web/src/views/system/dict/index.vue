<script lang="ts" setup>
import type { IDict, IDictParams } from '@yy-admin/common-apis'
import { DictApi } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { type YyTableColumns, createColumn as cT } from '@yy-admin/components-vexip'
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

const { formModel, visible, modalTitle, handleInitForm, saveLoading, handleSaveForm, findLoading, formRef } = useCurdForm<IDict>({
  initFormFn: iniDictForm,
  saveAction: DictApi.save,
  putAction: DictApi.put,
  findIdAction: DictApi.findId,
  afterSave: searchTable,
})

const dictName = ref<string>('')

const columns = computed<YyTableColumns<keyof IDict>[]>(() => ([
  cT('name', '名称', 100),
  cT('description', '名称', 100),
  cT('action', '操作', { fixed: 'right' }, true),
]))
</script>

<template>
  <a-row :gutter="16">
    <a-col :span="10">
      <YyTable
        v-model:current="current"
        v-model:limit="limit"
        :total="total" :loading="loading"
        :columns="columns" :data-source="dataSource"
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

        <template #action="{ record }">
          <a-button type="link" @click="handleInitForm(record.id)">
            修改
          </a-button>

          <a-button type="link" @click="dictName = record.name">
            配置
          </a-button>

          <a-button type="link" @click="delDataRow(record.id)">
            删除
          </a-button>
        </template>

        <a-modal v-model:open="visible" :title="modalTitle" :confirm-loading="saveLoading" @ok="handleSaveForm">
          <a-form ref="formRef" v-loading="findLoading" :rules="{}" :model="formModel">
            <a-form-item name="name" label="字典名称">
              <a-input v-model:value="formModel.name" placeholder="请输入角字典名称" />
            </a-form-item>
            <a-form-item name="level" label="描述">
              <a-input-number v-model:value="formModel.description" placeholder="请输入描述" />
            </a-form-item>
          </a-form>
        </a-modal>
      </YyTable>
    </a-col>
    <a-col :span="14">
      <DictDetail v-model:dictKey="dictName" />
    </a-col>
  </a-row>
</template>
