import { type MaybeRefOrGetter, useToggle } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'

const useForm = Form.useForm
export interface IUseCurdFormOptions<T extends object, EditId extends string = 'id'> {
  formKey?: string
  formRule?: MaybeRefOrGetter<Partial<Record<keyof T, Rule | Rule[]>>>
  saveAction: (data: IFormEntity<T, EditId>) => Promise<void>
  putAction?: (data: IFormEntity<T, EditId>) => Promise<void>
  afterSave?: (model?: IFormEntity<T, EditId>) => void
  beforeSave?: (saveData?: Partial<IFormEntity<T, EditId>> & { [key: string]: any }) => { [key: string]: any }
  afterDetail?: () => void
}

type basicKeyType = string | number | symbol
type AppendToObject<T, K extends basicKeyType, V> = {
  [P in keyof T | K]: P extends keyof T ? T[P] : V
}

type IFormEntity<T, EditId extends string> = Partial<AppendToObject<T, EditId, string>>

export function useCurdForm<T extends object, EditId extends string = 'id'>(options: IUseCurdFormOptions<T>) {
  const {
    formKey,
    formRule,
    saveAction,
    putAction,
    afterSave,
    beforeSave,
    afterDetail,
  } = Object.assign({ formKey: 'id', formRule: {}, beforeSave: () => ({}) }, options)
  const modelRef = ref<IFormEntity<T, EditId>>({})
  const [visible, toggleVisible] = useToggle()
  const [saveLoading, toggleSaveLoading] = useToggle()
  const editId = ref<IUseCurdFormOptions<T>['formKey']>('')
  const isAdd = computed(() => !editId.value)
  const modalTitle = computed(() => isAdd.value ? '添加' : '编辑')

  const { resetFields, validate, validateInfos } = useForm(modelRef, formRule, {})

  function handleOpenDialog(row: IFormEntity<T, EditId> = {}) {
    toggleSaveLoading(false)
    resetFields()
    editId.value = (row[formKey as EditId] || '') as string
    modelRef.value = JSON.parse(JSON.stringify(row))
    afterDetail && afterDetail()
    toggleVisible(true)
  }

  function handleSaveForm() {
    validate().then(() => {
      toggleSaveLoading(true)
      const requestSave = isAdd.value ? saveAction : (putAction || saveAction)
      const saveParams = {
        [formKey]: editId.value || '',
        ...modelRef.value as unknown as any,
      }
      requestSave({ ...saveParams, ...beforeSave(saveParams) })
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
