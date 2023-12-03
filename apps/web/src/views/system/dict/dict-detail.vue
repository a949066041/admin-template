<script lang="ts" setup>
import type { IDictDetail, IDictDetailParams } from '@yy-admin/common-apis'
import { DictDetailApi } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { type YyTableColumns, createColumn as cT } from '@yy-admin/components-vexip'
import { computed, watch } from 'vue'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import { useVModel } from '@vueuse/core'

defineOptions({
  name: 'DictDetail',
})

const props = withDefaults(defineProps<{ dictKey: string }>(), {})

const bindDictKey = useVModel(props, 'dictKey')
const { dataSource, limit, current, total, loading, searchForm, searchTable, resetTable, delDataRow } = useTable<
  { blurry: string } & IDictDetail,
{ dictName: string }
>({
  apiAction: DictDetailApi.page,
  delAction: DictDetailApi.del,
  firstLoad: false,
  initSearch() {
    return {
      dictName: props.dictKey,
    }
  },
},
)

function iniDictDetailForm() {
  return initFormObj(['name', 'dictSort', 'label', 'value'], {
  }) as IDictDetailParams
}

const { formModel, visible, modalTitle, handleInitForm, saveLoading, handleSaveForm, findLoading, formRef } = useCurdForm<IDictDetail>({
  initFormFn: iniDictDetailForm,
  saveAction: DictDetailApi.save,
  putAction: DictDetailApi.put,
  findIdAction: DictDetailApi.findId,
  afterSave: searchTable,
})

watch(bindDictKey, (val) => {
  if (val)
    resetTable()
})

const columns = computed<YyTableColumns<keyof IDictDetail | 'dictName'>[]>(() => ([
  cT(['dict', 'name'], '所属字典', 100),
  cT('label', '字典标签', 100),
  cT('value', '字典值', 100),
  cT('dictSort', '排序值', 100),
  cT('action', '操作', { fixed: 'right' }, true),
]))
</script>

<template>
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

      <a-button type="link" @click="delDataRow(record.id)">
        删除
      </a-button>
    </template>

    <a-modal v-model:open="visible" :title="modalTitle" :confirm-loading="saveLoading" @ok="handleSaveForm">
      <a-form ref="formRef" v-loading="findLoading" :rules="{}" :model="formModel">
        <a-form-item name="label" label="字典名称">
          <a-input v-model:value="formModel.label" placeholder="请输入角字典名称" />
        </a-form-item>
        <a-form-item name="value" label="描述">
          <a-input v-model:value="formModel.value" placeholder="请输入描述" />
        </a-form-item>
        <a-form-item name="value" label="描述">
          <a-input-number v-model:value="formModel.dictSort" placeholder="请输入排序值" />
        </a-form-item>
      </a-form>
    </a-modal>
  </YyTable>
</template>
