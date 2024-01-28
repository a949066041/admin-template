import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { getStore, setStore } from '@yy-web/request'

export const useRequestCache = defineStore('request-cache', () => {
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
