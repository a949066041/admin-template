<script lang="ts" setup>
import type { IDictDetail, IDictDetailParams } from '@yy-admin/common-apis'
import { DictDetailApi } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { type YyTableColumns, createColumn as cT } from '@yy-admin/components-naive'
import { computed, watch } from 'vue'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import { useVModel } from '@vueuse/core'

defineOptions({
  name: 'DictDetail',
})

const props = withDefaults(defineProps<{ dictKey: string, dictId?: number }>(), {})

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
  beforeSave() {
    return {
      dict: { id: props.dictId! },
    }
  },
})

watch(bindDictKey, (val) => {
  if (val)
    resetTable()
})

const columns = computed<YyTableColumns<keyof IDictDetail | 'dictName'>[]>(() => ([
  cT('dictName', '所属字典', true),
  cT('label', '字典标签'),
  cT('value', '字典值'),
  cT('dictSort', '排序值'),
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
        <n-form-item>
          <n-input v-model:value="searchForm.blurry" placeholder="请输入关键字查询" />
        </n-form-item>
      </yy-search>
    </template>

    <template #dictName>
      {{ dictKey }}
    </template>

    <template #tools>
      <n-button type="primary" @click="handleInitForm()">
        新增
      </n-button>
    </template>

    <template #action="{ record }">
      <n-button type="primary" quaternary @click="handleInitForm(record.id)">
        修改
      </n-button>

      <n-button type="error" quaternary @click="delDataRow(record.id)">
        删除
      </n-button>
    </template>

    <YyModal v-model:visible="visible" :title="modalTitle" class="w-100" :confirm-loading="saveLoading" @ok="handleSaveForm">
      <n-form ref="formRef" :loading="findLoading" :rules="{}" :model="formModel">
        <n-form-item name="label" label="字典名称">
          <n-input v-model:value="formModel.label" placeholder="请输入角字典名称" />
        </n-form-item>
        <n-form-item name="value" label="描述">
          <n-input v-model:value="formModel.value" placeholder="请输入描述" />
        </n-form-item>
        <n-form-item name="value" label="排序">
          <n-input-number v-model:value="formModel.dictSort" placeholder="请输入排序值" />
        </n-form-item>
      </n-form>
    </YyModal>
  </YyTable>
</template>
