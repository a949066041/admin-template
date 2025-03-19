import { createGlobalState } from '@vueuse/core'
import { computed, ref } from 'vue'

export const useCounterStore = createGlobalState(() => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
