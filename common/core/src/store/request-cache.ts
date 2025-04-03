import type { getStore, setStore } from '@yy-web/request'
import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useRequestCache = createGlobalState(() => {
  const requestStore = ref<Map<string, any>>(new Map())

  const getRequestStore: typeof getStore = (key: string) => {
    return requestStore.value.get(key)
  }

  const setRequestStore: typeof setStore = (key: string, value: any) => {
    requestStore.value.set(key, value)
  }

  return {
    requestStore,
    getStore: getRequestStore,
    setStore: setRequestStore,
  }
})
