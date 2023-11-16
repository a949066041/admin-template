<script lang="ts" setup>
import type { IDict } from '@yy-admin/common-apis'
import { DictApi } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import type { YyTableColumns } from '@yy-admin/components-antdv'
import { createColumn as cT } from '@yy-admin/components-antdv'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import { computed } from 'vue'

defineOptions({
  name: 'DictPage',
})
const { dataSource, limit, current, total, loading } = useTable({
  apiAction: DictApi.page,
})

// const { formModel, visible, modalTitle, handleInitForm, saveLoading, handleSaveForm, findLoading, formRef } = useCurdForm<IDict>({
//   saveAction: DictApi.save,
//   putAction: DictApi.put,
//   findIdAction: DictApi.findId,
//   afterSave: searchTable,
// })

// const columns = computed<(YyTableColumns<keyof IDict>)[]>(() => ([
//   createColumn('id', 'id'),
//   createColumn('name', 'name'),
//   createColumn('description', 'description'),
// ]))

const columns = computed(() => ([
  cT<keyof IDict>('name', '名称'),
  cT<keyof IDict>('description', '名称'),
]))
</script>

<template>
  <YyTable
    v-model:current="current"
    v-model:limit="limit"
    :total="total" :loading="loading"
    :columns="columns" :data-source="dataSource"
  />
</template>
