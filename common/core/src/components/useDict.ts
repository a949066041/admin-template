import type { IDictDetailEntity } from '@yy-admin/common-apis'
import type { MaybeRef } from 'vue'
import { useToggle, watchImmediate } from '@vueuse/core'
import { DictDetailApi } from '@yy-admin/common-apis'
import { computed, ref, toValue } from 'vue'

export interface IUseDictOption {
  transform?: MaybeRef<'string' | 'boolean' | 'number'> | string
}

export function useDict(dict?: MaybeRef<string>, option?: IUseDictOption) {
  const { transform = 'string' } = option || {}
  const [loading, toggleLoading] = useToggle()

  const dictValue = ref<IDictDetailEntity[]>([])

  const transformDict = computed(() => {
    const transformValue = toValue(transform)
    if (!transformValue || transformValue === 'string')
      return dictValue.value

    if (transformValue === 'boolean') {
      return dictValue.value.map((item) => {
        return {
          label: item.label,
          value: item.value === 'true',
        }
      })
    }

    if (transformValue === 'number') {
      return dictValue.value.map((item) => {
        return {
          label: item.label,
          value: Number(item.value),
        }
      })
    }
  })

  const flatData = computed(() => {
    return dictValue.value.reduce((prev, curr) => {
      prev[curr.value] = curr.label
      return prev
    }, {} as Record<string, string>)
  })

  watchImmediate(() => toValue(dict), (val) => {
    if (!val)
      return
    toggleLoading()
    DictDetailApi.getDictMap(val!).then((res) => {
      dictValue.value = res[val as unknown as number]
    }).finally(() => {
      toggleLoading(false)
    })
  })

  return {
    loading,
    data: transformDict,
    flatData,
  }
}
