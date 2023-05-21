import { useIntervalFn } from '@vueuse/core'
import { ref } from 'vue'

export function useCounter() {
  const value = ref(0)

  useIntervalFn(() => {
    value.value += 1
  }, 1000)

  return {
    value,
  }
}
