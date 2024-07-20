<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { NaiveFormRules, YyTableColumns } from '@yy-admin/components-naive'
import { createColumn as cT } from '@yy-admin/components-naive'
import { YyDictSelect, useLazyTableTree } from '@yy-admin/components-admin'
import { DeptApi } from '@yy-admin/common-apis'
import type { IDeptEntity, IDeptTableParams, IDeptTreeRecord } from '@yy-admin/common-apis'
import { useTable } from '@yy-web/business-use'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import { omit } from 'lodash-es'
import { useDeptTree } from './useDeptTree'

defineOptions({
  name: 'Dept',
})

const {
  dataSource,
  searchForm,
  searchTable,
  resetTable,
  delDataRow,
  getTable,
  loading,
  confirmTable,
} = useTable<IDeptTableParams, IDeptTreeRecord>({
  apiAction: DeptApi.pageTree,
  pagination: false,
  delAction: DeptApi.del,
})

const columns = computed<YyTableColumns<keyof IDeptTreeRecord>[]>(() => ([
  cT('name', '名称'),
  cT('deptSort', '排序'),
  cT('enabled', '是否开启', true),
  cT('createTime', '创建时间'),
  cT('action', '操作', true),
]))

const { handleRefreshLoadTree, openKeys, lazyLoad, renderKeys } = useLazyTableTree<IDeptTreeRecord>({
  onLoad(row: IDeptTreeRecord) {
    return new Promise<IDeptTreeRecord[]>((resolve) => {
      DeptApi.pageTree({ pid: row.id }).then((res) => {
        row.children = res.map(item => ({ ...item, parent: row }))
        resolve(res)
      })
    })
  },
  onLoadRoot: getTable,
})

function handleUpdateEnabled(entity: IDeptTreeRecord) {
  confirmTable(
    `确认要${entity.enabled ? '禁用' : '启用'}部门吗？`,
    () => DeptApi.put(omit({ ...entity, enabled: !entity.enabled, id: entity.id }, ['children', 'parent'])).then(() => {
      handleRefreshLoadTree(entity.pid)
    }),
  )
}

const { triggerDeptTree, deptTreeData, handleLazyDept } = useDeptTree()
function initDeptForm() {
  return initFormObj(['name', 'deptSort', 'enabled', 'pid', 'subCount'] as const, {
    enabled: true,
    deptSort: 999,
    subCount: 0,
  }) as IDeptEntity
}
const rules = ref<NaiveFormRules<IDeptEntity>>({
  name: {
    required: true,
    message: '请输入部门名称',
  },
  deptSort: {
    required: true,
    message: '请输入部门排序',
  },
})
const {
  formModel,
  visible,
  modalTitle,
  handleInitForm,
  saveLoading,
  handleSaveForm,
  formRef,
} = useCurdForm<IDeptEntity>({
  initFormFn: initDeptForm,
  saveAction: DeptApi.save,
  putAction: DeptApi.put,
  findIdAction: DeptApi.findId,
  afterSave(saveData: IDeptEntity) {
    handleRefreshLoadTree(saveData.pid)
  },
  afterDetail(result, isAdd) {
    triggerDeptTree(!!isAdd, result?.pid)
  },
})
</script>

<template>
  <YyTable
    v-bind="{ loading, dataSource }"
    v-model:expanded-row-keys="openKeys"
    :row-key="renderKeys"
    :pager="false"
    :columns="columns"
    @load="lazyLoad"
  >
    <template #search>
      <yy-search :model="searchForm" @submit="searchTable" @search="searchTable" @reset="resetTable">
        <n-form-item>
          <div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
            <div class="i-vscode-icons:file-type-light-pnpm" />
            <div class="i-vscode-icons:file-type-light-pnpm?mask text-red-300" />
          </div>
          <!--          <n-input v-model:value="searchForm.name" placeholder="输入部门名称" /> -->
        </n-form-item>
        <n-form-item>
          <YyRangeDatePicker v-model:range="searchForm.createTime" merge-range type="daterange" />
        </n-form-item>
        <n-form-item>
          <YyDictSelect v-model:value="searchForm.enabled" dict="user_status" placeholder="请选择状态" />
        </n-form-item>
      </yy-search>
    </template>
    <template #enabled="{ text, record }">
      <n-switch :value="text" @update-value="handleUpdateEnabled(record)" />
    </template>

    <template #tools>
      <n-space>
        <n-button type="primary" @click="handleInitForm()">
          新增
        </n-button>
        <n-button type="primary" @click="DeptApi.download({})">
          导出
        </n-button>
      </n-space>
    </template>

    <template #action="{ record }">
      <n-button type="primary" quaternary @click="handleInitForm(record)">
        修改
      </n-button>
      <n-button type="error" quaternary @click="delDataRow(record.id)">
        删除
      </n-button>
    </template>

    <YyModal v-model:visible="visible" :title="modalTitle" class=" w-[600px]" :confirm-loading="saveLoading" @ok="handleSaveForm">
      <n-form ref="formRef" :rules="rules" :model="formModel">
        <n-form-item path="name" label="名称">
          <n-input v-model:value="formModel.name" placeholder="请输入" />
        </n-form-item>
        <n-form-item path="pid" label="上级部门">
          <yy-tree-select
            v-model:value="formModel.pid"
            :options="deptTreeData"
            :on-load="handleLazyDept"
            placeholder="请选择部门"
          />
        </n-form-item>
        <n-form-item path="deptSort" label="排序">
          <n-input-number v-model:value="formModel.deptSort" placeholder="请输入" />
        </n-form-item>
        <n-form-item path="enabled" label="状态">
          <YyDictSelect v-model:value="formModel.enabled" type="radio" dict="job_status" transform="boolean" />
        </n-form-item>
      </n-form>
    </YyModal>
  </YyTable>
</template>
