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
  cT('dictName', '所属字典', { accessor: () => props.dictKey }),
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

      <Linker @click="delDataRow(record.id)">
        删除
      </Linker>
    </template>

    <Modal v-model:active="visible" :title="modalTitle" :loading="saveLoading" @confirm="handleSaveForm">
      <Form ref="formRef" v-loading="findLoading" :rules="{}" :model="formModel">
        <FormItem name="label" label="字典名称">
          <Input v-model:value="formModel.label" placeholder="请输入角字典名称" />
        </FormItem>
        <FormItem name="value" label="描述">
          <Input v-model:value="formModel.value" placeholder="请输入描述" />
        </FormItem>
        <FormItem name="value" label="描述">
          <NumberInput v-model:value="formModel.dictSort" placeholder="请输入排序值" />
        </FormItem>
      </Form>
    </Modal>
  </YyTable>
</template>
