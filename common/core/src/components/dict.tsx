import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useDict } from './useDict'

export default defineComponent({
  name: 'YyDict',
  props: {
    dict: {
      type: String as PropType<string>,
    },
    transform: {
      type: String as PropType<'boolean' | 'number' | 'string'>,
      validate(val: string) {
        return ['boolean', 'number', 'string'].includes(val)
      },
      default: 'string',
    },
  },
  setup(props, { slots }) {
    const { loading, flatData, data } = useDict(props.dict, { transform: props.transform })
    return () => (
      slots?.default?.({ loading: loading.value, data: data.value, flatData: flatData.value })
    )
  },
})
