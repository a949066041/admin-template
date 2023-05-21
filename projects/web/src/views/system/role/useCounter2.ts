import { toValue } from '@vueuse/core'
import { computed } from 'vue'
import type { MaybeRefOrGetter } from '@vueuse/core'

() => 1
1
computed()
ref => 1
export function useCounter2(value2: MaybeRefOrGetter<number>) {
  const value = computed(() => {
    return toValue(value2) * 2
  })

  return {
    value,
  }
}
