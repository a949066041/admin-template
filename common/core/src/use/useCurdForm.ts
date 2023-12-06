import { useToggle } from '@vueuse/core'
import type { FormInst } from 'naive-ui'
import type { Ref } from 'vue'
import { computed, nextTick, ref } from 'vue'

/**
 * 初始化表单对象的函数
 * @param keys 字段数组
 * @param aliasObj 可选的别名对象
 * @returns 新的表单对象
 */
export function initFormObj<T extends readonly string[]>(keys: T, aliasObj = {} as Partial<Record<T[number], unknown>>) {
  return keys.reduce((base, item) => {
    const value = typeof aliasObj[item as T[number]] !== 'undefined' ? aliasObj[item as T[number]] : undefined
    return {
      ...base,
      [item]: value,
    }
  }, {} as Record<T[number], typeof aliasObj[T[number]] extends undefined ? undefined : typeof aliasObj[T[number]]>)
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

  const formRef = ref<FormInst | null>(null)
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
      formRef.value?.restoreValidation()
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
    formRef.value?.validate((res) => {
      if (!res) {
        toggleSaveLoading(true)
        const requestSave = isAdd.value ? saveAction : (putAction || saveAction)
        requestSave({ ...formModel.value, [formKey]: editId.value })
          .then((result) => {
            toggleVisible(false)
            afterSave && afterSave(result)
          })
          .catch(() => toggleSaveLoading(false))
      }
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
