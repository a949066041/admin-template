import type { PropType } from 'vue'
import type { IDictDetail } from '@yy-admin/common-apis'
import { DictDetailApi } from '@yy-admin/common-apis'
import { computed, defineComponent, ref, watch } from 'vue'
import { useToggle } from '@vueuse/core'

export default defineComponent({
  name: 'YyDict',
  props: {
    dict: {
      type: String as PropType<string>,
    },
    transform: {
      type: String as PropType<'boolean' | 'number' | ''>,
      validate(val: string) {
        return ['boolean', 'number'].includes(val)
      },
      default: '',
    },
  },
  setup(props, { slots }) {
    const dictkeys = computed(() => {
      if (!props.dict)
        return []
      return [props.dict]
    })
    const dictValue = ref<IDictDetail[]>([])
    const transformDict = computed(() => {
      if (!props.transform)
        return dictValue.value

      if (props.transform === 'boolean') {
        return dictValue.value.map((item) => {
          return {
            label: item.label,
            value: item.value === 'true',
          }
        })
      }

      if (props.transform === 'number') {
        return dictValue.value.map((item) => {
          return {
            label: item.label,
            value: Number(item.value),
          }
        })
      }
    })

    const [loading, toggleLoading] = useToggle()
    watch(dictkeys, (val) => {
      if (val.length === 0)
        return

      toggleLoading(true)
      DictDetailApi.getDictMap(val!).then((res) => {
        dictValue.value = res[props.dict as keyof typeof val]
      }).finally(() => {
        toggleLoading(false)
      })
    }, { immediate: true })

    return () => (
      slots?.default?.({ loading: loading.value, data: transformDict.value })
    )
  },
})
