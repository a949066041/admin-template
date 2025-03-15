import type { IMenuEntity } from '@yy-admin/common-apis'
import type { NaiveFormRules } from '@yy-admin/components-naive'
import type { SelectRenderLabel } from 'naive-ui'
import { MenuApi } from '@yy-admin/common-apis'
import { initFormObj, useCurdForm } from '@yy-admin/common-core'
import { iconList } from '@yy-admin/common-css'
import { useMenuTree } from './useMenuTree'

export function useMenuForm(refreshTable: (pid?: number) => void) {
  function initMenuForm() {
    return initFormObj([
      'type',
      'title',
      'icon',
      'iFrame',
      'hidden',
      'title',
      'path',
      'menuSort',
      'pid',
      'component',
      'componentName',
      'permission',
      'cache',
      'subCount',
    ] as const, {
      cache: false,
      iFrame: false,
      hidden: false,
      menuSort: 1,
      subCount: 0,
    }) as IMenuEntity
  }

  const menuIconList = computed(() => iconList.map(item => ({ id: item.replace('i-custom:', ''), name: item.replace('i-custom:', '') })))

  const renderIconLabel: SelectRenderLabel = (options) => {
    return h('div', { class: 'flex items-center', style: { 'align-items': 'center' } }, [h('i', { class: `i-custom:${options.id}` }), h('span', options.id as string)])
  }

  const rules = ref<NaiveFormRules<IMenuEntity>>({
    title: [
      {
        required: true,
        message: '请输入菜单名称',
      },
    ],
    path: [
      {
        required: true,
        message: '请输入菜单路径',
      },
    ],
    pid: [
      {
        required: true,
        message: '请选择父级菜单',
      },
    ],
    type: [
      {
        required: true,
        message: '请选择菜单类型',
      },
    ],
    iFrame: [
      {
        required: true,
        message: '请选择是否外链',
      },
    ],
    hidden: [
      {
        required: true,
        message: '请选择是否隐藏',
      },
    ],
  })

  const { menuTreeData, triggerMenuTree, handleLazyMenu } = useMenuTree()
  const {
    formModel,
    visible,
    modalTitle,
    handleInitForm,
    saveLoading,
    handleSaveForm,
    formRef,
    editId,
  } = useCurdForm<IMenuEntity>({
    initFormFn: initMenuForm,
    saveAction: MenuApi.save,
    putAction: MenuApi.put,
    findIdAction: MenuApi.findId,
    afterSave(saveData) {
      refreshTable(saveData.pid)
    },
    afterDetail(result, isAdd) {
      if (!result?.pid)
        formModel.value.pid = 0

      triggerMenuTree(!!isAdd, Number(editId?.value))
    },
  })

  return {
    menuTreeData,
    handleLazyMenu,
    initMenuForm,
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
  }
}
