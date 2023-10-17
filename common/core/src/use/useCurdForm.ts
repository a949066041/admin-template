import { useToggle } from '@vueuse/core'
import type { FormInstance } from 'ant-design-vue'
import type { Ref } from 'vue'
import { computed, nextTick, ref } from 'vue'

export function initFormObj(keys: string[], aliasObj?: Record<string, any>) {
  return keys.reduce((base, item) => {
    const value = (aliasObj || {})[item] || undefined
    return {
      ...base,
      item: value,
    }
  }, {} as Record<string, unknown>)
}
export interface IUseCurdOptions<T, Key extends string | number> {
  formKey?: string
  initFormFn: () => T
  findIdAction?: (id: Key) => Promise<T>
  saveAction: (data: T) => Promise<void | any>
  putAction?: (data: T) => Promise<void | any>
  afterDetail?: (result?: T) => void
  afterSave?: (result?: any) => void
}

export function useCurdForm<T extends Record<string, any>, Key extends string | number = number>(options: IUseCurdOptions<T, Key>) {
  const {
    formKey = 'id',
    initFormFn,
    saveAction,
    putAction,
    findIdAction,
    afterSave,
    afterDetail,
  } = options

  const formRef = ref<FormInstance | null>(null)
  const formModel = ref<T>(initFormFn()) as Ref<T>
  const [visible, toggleVisible] = useToggle()
  const [findLoading, toggleFindLoading] = useToggle()
  const [saveLoading, toggleSaveLoading] = useToggle()
  const editId = ref<string | null>(null)

  const isAdd = computed(() => !editId.value)
  const modalTitle = computed(() => isAdd.value ? '添加' : '编辑')

  function handleInitForm(id: Key): void
  function handleInitForm<U = object>(formValues: U): void
  function handleInitForm(): void
  function handleInitForm(values?: any): void {
    editId.value = null
    toggleSaveLoading(false)
    toggleVisible()
    nextTick(async () => {
      formRef.value?.resetFields()
      if (['string', 'number'].includes(typeof values)) {
        editId.value = values
        toggleFindLoading(true)
        if (!findIdAction)
          throw new Error('yy-web: no config findIdAction')

        findIdAction(values).then((formData) => {
          formModel.value = formData
          afterDetail && afterDetail(formData)
        }).finally(() => toggleFindLoading(false))
        return
      }

      if (typeof values === 'object') {
        formModel.value = JSON.parse(JSON.stringify(values))
        editId.value = values[formKey]
        afterDetail && afterDetail(formModel.value)
        return
      }

      formModel.value = initFormFn()
      afterDetail && afterDetail(formModel.value)
    })
  }

  function handleSaveForm() {
    formRef.value?.validate().then(() => {
      toggleSaveLoading(true)
      const requestSave = isAdd.value ? saveAction : (putAction || saveAction)
      requestSave({ ...formModel.value, [formKey]: editId.value })
        .then((result) => {
          toggleVisible(false)
          afterSave && afterSave(result)
        })
        .catch(() => toggleSaveLoading(false))
    })
  }

  return {
    formRef,
    formModel,
    modalTitle,
    isAdd,
    visible,
    findLoading,
    saveLoading,
    handleSaveForm,
    handleInitForm,
  }
}
