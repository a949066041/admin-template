<script lang="ts" setup>
import type { IDictEntity, IDictRecord, IDictTableParams } from '@yy-admin/common-apis'
import type { NaiveFormRules, YyTableColumns } from '@yy-admin/components-naive'
import { DictApi } from '@yy-admin/common-apis'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import { createColumn as cT } from '@yy-admin/components-naive'
import { useTable } from '@yy-web/use-curd-vue'
import { computed, ref } from 'vue'
import DictDetail from './dict-detail.vue'
import { useDictAction } from './useDictAction'

defineOptions({
  name: 'Dict',
})

const { dictName, dictId, handleConfigDict } = useDictAction()
const {
  dataSource,
  pageConf,
  loading,
  searchForm,
  searchTable,
  resetTable,
  delDataRow,
} = useTable<IDictTableParams, IDictRecord>({
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
        v-model:current="pageConf.current"
        v-model:limit="pageConf.limit"
        :total="pageConf.total" :loading="loading"
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
      <DictDetail v-if="dictId" v-model:dict-key="dictName" :dict-id="dictId" />
    </n-gi>
  </n-grid>
</template>
