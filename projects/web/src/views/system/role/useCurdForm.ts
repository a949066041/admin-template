import { type MaybeRefOrGetter, toValue, useToggle } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { getRequest as useRequest } from '@yy-web/request'

const useForm = Form.useForm
export interface IUseCurdFormOptions<T extends object, EditId extends string = 'id'> {
  tableId?: string
  formRule?: MaybeRefOrGetter<Partial<Record<keyof T, Rule | Rule[]>>>
  baseApi: MaybeRefOrGetter<string>
  saveUrl?: MaybeRefOrGetter<string>
  putUrl?: MaybeRefOrGetter<string>
  afterSave?: (model?: Partial<AppendToObject<T, EditId, string>>) => void
}

type basicKeyType = string | number | symbol
type AppendToObject<T, K extends basicKeyType, V> = {
  [P in keyof T | K]: P extends keyof T ? T[P] : V
}

export function useCurdForm<T extends object, EditId extends string = 'id'>(options: IUseCurdFormOptions<T>) {
  const {
    tableId,
    formRule,
    baseApi,
    saveUrl,
    putUrl,
    afterSave,
  } = Object.assign(options, { tableId: 'id', formRule: {} })
  const request = useRequest()!
  const modelRef = ref<Partial<AppendToObject<T, EditId, string>>>({})
  const [visible, toggleVisible] = useToggle()
  const [saveLoading, toggleSaveLoading] = useToggle()
  const editId = ref<IUseCurdFormOptions<T>['tableId']>('')
  const isAdd = computed(() => !editId.value)
  const modalTitle = computed(() => isAdd.value ? '添加' : '编辑')

  const { resetFields, validate, validateInfos } = useForm(modelRef, formRule, {})

  function handleOpenDialog(row: Partial<AppendToObject<T, EditId, string>> = {}) {
    toggleSaveLoading(false)
    resetFields()
    editId.value = (row[tableId as EditId] || '') as string
    modelRef.value = JSON.parse(JSON.stringify(row))
    toggleVisible(true)
  }

  function handleSaveForm() {
    validate().then(() => {
      toggleSaveLoading(true)
      request
        .setPath(toValue((isAdd.value ? saveUrl : putUrl) || baseApi))[isAdd.value ? 'post' : 'put'](modelRef.value!)
        .then(() => {
          message.success('操作成功')
          toggleVisible(false)
          afterSave && afterSave(modelRef.value!)
        }).catch(() => {
          toggleSaveLoading(false)
        })
    })
  }

  return {
    isAdd,
    modalTitle,
    visible,
    modelRef,
    saveLoading,
    validateInfos: validateInfos as Record<keyof T, Rule | Rule[]>,
    handleSaveForm,
    handleOpenDialog,
  }
}
