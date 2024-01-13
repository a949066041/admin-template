<script lang="ts" setup>
import { MenuApi } from '@yy-admin/common-apis'
import type { IMenuTableParams, IMenuTreeRecord } from '@yy-admin/common-apis'
import { createColumn as cT } from '@yy-admin/components-naive'
import { computed } from 'vue'
import type { YyTableColumns } from '@yy-admin/components-naive'
import { useTable } from '@yy-web/business-use'
import { YyDictSelect, useLazyTableTree } from '@yy-admin/components-admin'
import { useMenuForm } from './useMenuForm'

defineOptions({
  name: 'SystemMenu',
})

const {
  dataSource,
  searchForm,
  searchTable,
  resetTable,
  delDataRow,
  loading,
  getTable,
} = useTable<IMenuTableParams, IMenuTreeRecord>({
  apiAction: params => MenuApi.pageTree(params),
  pagination: false,
  delAction: MenuApi.del,
})

const columns = computed<YyTableColumns<keyof IMenuTreeRecord>[]>(() => ([
  cT('title', '菜单名称'),
  cT('icon', '图标', true),
  cT('menuSort', '排序'),
  cT('permission', '权限标识'),
  cT('component', '组件路径'),
  cT('iFrame', '外链', { dict: 'boolean_map' }),
  cT('cache', '缓存', { dict: 'boolean_map' }),
  cT('hidden', '是否隐藏', { dict: 'boolean_map' }),
  cT('createTime', '创建日期'),
  cT('action', '操作', { fixed: 'right' }, true),
]))

const { handleRefreshLoadTree, openKeys, lazyLoad, renderKeys } = useLazyTableTree<IMenuTreeRecord>({
  onLoad(row: IMenuTreeRecord) {
    return new Promise<IMenuTreeRecord[]>((resolve) => {
      MenuApi.pageTree({ pid: row.id }).then((res) => {
        row.children = res.map(item => ({ ...item, parent: row }))
        resolve(res)
      })
    })
  },
  onLoadRoot: getTable,
})

const {
  menuIconList,
  renderIconLabel,
  rules,
  formModel,
  visible,
  modalTitle,
  handleInitForm,
  saveLoading,
  handleSaveForm,
  formRef,
  menuTreeData,
  handleLazyMenu,
} = useMenuForm(handleRefreshLoadTree)
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
          <n-input v-model:value="searchForm.blurry" placeholder="模糊搜索" />
        </n-form-item>
        <n-form-item>
          <YyRangeDatePicker v-model:range="searchForm.createTime" merge-range type="daterange" />
        </n-form-item>
      </yy-search>
    </template>

    <template #tools>
      <n-space>
        <n-button type="primary" @click="handleInitForm()">
          新增
        </n-button>
        <n-button type="primary" @click="MenuApi.download({})">
          导出
        </n-button>
      </n-space>
    </template>

    <template #icon="{ text }">
      <i :class="`i-custom:${text}`" class="flex text-gray-400" />
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
        <n-grid :x-gap="16">
          <n-gi :span="12">
            <n-form-item path="type" label="菜单类型">
              <YyDictSelect v-model:value="formModel.type" type="radio" dict="menu_type" transform="number" />
            </n-form-item>
          </n-gi>
          <n-gi v-if="formModel.type !== 2" :span="12">
            <n-form-item path="icon" label="菜单图标">
              <yy-select v-model:value="formModel.icon" :options="menuIconList" placeholder="请选择" :render-label="renderIconLabel" />
            </n-form-item>
          </n-gi>
          <n-gi v-if="formModel.type !== 2" :span="8">
            <n-form-item path="iFrame" label="外链菜单">
              <YyDictSelect v-model:value="formModel.iFrame" type="radio" dict="boolean_map" transform="boolean" />
            </n-form-item>
          </n-gi>
          <n-gi v-if="formModel.type === 1" :span="8">
            <n-form-item path="cache" label="菜单缓存">
              <YyDictSelect v-model:value="formModel.cache" type="radio" dict="boolean_map" transform="boolean" />
            </n-form-item>
          </n-gi>
          <n-gi v-if="formModel.type !== 2" :span="8">
            <n-form-item path="hidden" label="是否隐藏">
              <YyDictSelect v-model:value="formModel.hidden" type="radio" dict="boolean_map" transform="boolean" />
            </n-form-item>
          </n-gi>
          <n-gi :span="12">
            <n-form-item path="title" label="菜单标题">
              <n-input v-model:value="formModel.title" placeholder="请输入菜单标题" />
            </n-form-item>
          </n-gi>
          <n-gi v-if="formModel.type !== 0" :span="12">
            <n-form-item path="permission" label="权限标识">
              <n-input v-model:value="formModel.permission" placeholder="请输入权限标识" />
            </n-form-item>
          </n-gi>
          <n-gi v-if="formModel.type !== 2" :span="12">
            <n-form-item path="path" label="路由地址">
              <n-input v-model:value="formModel.path" placeholder="请输入路由地址" />
            </n-form-item>
          </n-gi>
          <n-gi :span="12">
            <n-form-item path="menuSort" label="菜单排序">
              <n-input-number v-model:value="formModel.menuSort" placeholder="请输入菜单排序" />
            </n-form-item>
          </n-gi>
          <n-gi v-if="formModel.type === 1" :span="12">
            <n-form-item path="componentName" label="组件名称">
              <n-input v-model:value="formModel.componentName" placeholder="请输入组件名称" />
            </n-form-item>
          </n-gi>
          <n-gi v-if="formModel.type === 1" :span="12">
            <n-form-item path="component" label="组件路径">
              <n-input v-model:value="formModel.component" placeholder="请输入组件路径" />
            </n-form-item>
          </n-gi>
          <n-gi :span="12">
            <n-form-item path="pid" label="上级菜单">
              <yy-tree-select
                v-model:value="formModel.pid"
                :options="menuTreeData"
                :on-load="handleLazyMenu"
                placeholder="请选择上级菜单"
              />
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-form>
    </YyModal>
  </YyTable>
</template>
