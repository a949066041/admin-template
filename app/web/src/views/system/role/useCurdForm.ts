import { type MaybeRefOrGetter, useToggle } from '@vueuse/core'
import { computed, ref, toValue } from 'vue'
import { Form, message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'

const useForm = Form.useForm

export function initFormObj(keys: string[], aliasObj?: Record<string, any>) {
  return keys.reduce((base, item) => {
    const value = (aliasObj || {})[item] || undefined
    return {
      ...base,
      item: value,
    }
  }, {} as Record<string, unknown>)
}

export type KeyMapRule<T extends object> =
  {
    [K in keyof T]: Rule[];
  }

export interface IUseCurdFormOptions<T extends object, EditId extends string = 'id'> {
  formInitForm: () => Partial<IFormEntity<T, EditId>>
  formKey?: number
  formRule?: MaybeRefOrGetter<Partial<KeyMapRule<T>>>
  saveAction: (data: Partial<IFormEntity<T, EditId>>) => Promise<void>
  findAction?: (id: number) => Promise<T>
  putAction?: (data: IFormEntity<T, EditId>) => Promise<void>
  afterSave?: (model?: IFormEntity<T, EditId>) => void
  beforeSave?: (saveData?: Partial<IFormEntity<T, EditId>> & { [key: string]: any }) => { [key: string]: any }
  afterDetail?: (rowData?: T) => void
}

type basicKeyType = string | number | symbol
type AppendToObject<T, K extends basicKeyType, V> = {
  [P in keyof T | K]: P extends keyof T ? T[P] : V
}

type IFormEntity<T, EditId extends string> = Partial<AppendToObject<T, EditId, number>>

export function useCurdForm<T extends object, EditId extends string = 'id'>(options: IUseCurdFormOptions<T>) {
  const {
    formKey,
    formInitForm,
    formRule,
    saveAction,
    findAction,
    putAction,
    afterSave,
    beforeSave,
    afterDetail,
  } = Object.assign({ formKey: 'id', formRule: {}, beforeSave: () => ({}) }, options)
  const modelRef = ref<IFormEntity<T, EditId>>({})
  const [visible, toggleVisible] = useToggle()
  const [searchLoading, toggleSearchLoading] = useToggle()
  const rulesRef = ref<Partial<KeyMapRule<T>>>(toValue(formRule))
  const [saveLoading, toggleSaveLoading] = useToggle()
  const editId = ref<IUseCurdFormOptions<T>['formKey'] | null>(null)
  const isAdd = computed(() => !editId.value)
  const modalTitle = computed(() => isAdd.value ? '添加' : '编辑')

  const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {})

  function handleOpenDialog(row?: number) {
    toggleSaveLoading(false)
    resetFields()
    toggleVisible(true)

    if (typeof row === 'number' && findAction) {
      editId.value = row
      toggleSearchLoading(true)
      findAction(row).then((res) => {
        modelRef.value = JSON.parse(JSON.stringify(res))
        afterDetail && afterDetail(res)
      }).finally(toggleSearchLoading)
      return
    }

    modelRef.value = formInitForm() as any
    afterDetail && afterDetail(modelRef.value)
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
    searchLoading,
    modalTitle,
    visible,
    modelRef,
    saveLoading,
    validateInfos: validateInfos as Record<keyof T, Rule | Rule[]>,
    handleSaveForm,
    handleOpenDialog,
  }
}
