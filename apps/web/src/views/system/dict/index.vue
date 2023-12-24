<script lang="ts" setup>
import type { IDictEntity, IDictParams, IDictRecord } from '@yy-admin/common-apis'
import { DictApi } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { type NaiveFormRules, type YyTableColumns, createColumn as cT } from '@yy-admin/components-naive'
import { computed, ref } from 'vue'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import DictDetail from './dict-detail.vue'
import { useDictAction } from './useDictAction'

defineOptions({
  name: 'DictPage',
})

const { dictName, dictId, handleConfigDict } = useDictAction()
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
} = useTable<IDictParams, IDictRecord>({
  apiAction: DictApi.page,
  delAction: DictApi.del,
})

function iniDictForm() {
  return initFormObj(['name', 'description'] as const, {
  }) as IDictEntity
}

const rules = ref<NaiveFormRules<IDictEntity>>({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' },
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
} = useCurdForm<IDictEntity>({
  initFormFn: iniDictForm,
  saveAction: DictApi.save,
  putAction: DictApi.put,
  findIdAction: DictApi.findId,
  afterSave: searchTable,
})

const columns = computed<YyTableColumns<keyof IDictRecord>[]>(() => ([
  cT('name', '名称'),
  cT('description', '名称'),
  cT('action', '操作', { fixed: 'right' }, 200, true),
]))
</script>

<template>
  <n-grid :x-gap="16">
    <n-gi :span="10">
      <YyTable
        v-model:current="current"
        v-model:limit="limit"
        :total="total" :loading="loading"
        :columns="columns" :data-source="dataSource"
      >
        <template #search>
          <yy-search :model="searchForm" @submit="searchTable" @search="searchTable" @reset="resetTable">
            <n-form-item>
              <n-input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
            </n-form-item>
          </yy-search>
        </template>

        <template #tools>
          <n-button type="primary" @click="handleInitForm()">
            新增
          </n-button>
        </template>

        <template #action="{ record }">
          <n-button type="primary" quaternary @click="handleInitForm(record)">
            修改
          </n-button>

          <n-button type="info" quaternary @click="handleConfigDict(record)">
            配置
          </n-button>

          <n-button type="error" quaternary @click="delDataRow(record.id)">
            删除
          </n-button>
        </template>

        <YyModal v-model:visible="visible" class=" w-100" :title="modalTitle" :confirm-loading="saveLoading" @ok="handleSaveForm">
          <n-form ref="formRef" v-loading="findLoading" :rules="rules" :model="formModel">
            <n-form-item path="name" label="字典名称">
              <n-input v-model:value="formModel.name" placeholder="请输入角字典名称" />
            </n-form-item>
            <n-form-item path="description" label="描述">
              <n-input v-model:value="formModel.description" type="textarea" placeholder="请输入描述" />
            </n-form-item>
          </n-form>
        </YyModal>
      </YyTable>
    </n-gi>
    <n-gi :span="14">
      <DictDetail v-if="dictId" v-model:dictKey="dictName" :dict-id="dictId" />
    </n-gi>
  </n-grid>
</template>
