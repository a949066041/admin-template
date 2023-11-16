import type { MaybeComputedElementRef } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed, ref, toValue } from 'vue'

export interface ILazyConf<R = any> {
  render: (result: R) => void
  service: () => Promise<R>
}

export interface ILazyItemConf {
  loading: boolean
  name: string
  effectData: any
}

export function useLazyBox<T extends Record<string, ILazyConf>>(lazyConfig: T, effectData?: MaybeComputedElementRef<any>) {
  const itemConfig = ref(Object.keys(lazyConfig).reduce((base, item) => {
    base[item as keyof T] = { loading: false }
    return base
  }, {} as Record<keyof T, Pick<ILazyItemConf, 'loading'>>)) as Ref<Record<keyof T, Pick<ILazyItemConf, 'loading'>>>

  const renderConfig = computed(() => {
    return Object.entries(itemConfig.value).reduce((base, [key, { loading }]) => {
      base[key as keyof T] = { loading, name: key, effectData: toValue(effectData) }
      return base
    }, {} as Record<keyof T, ILazyItemConf>)
  })

  function handleRenderCb(key: keyof T) {
    if (!lazyConfig[key])
      return

    const { render, service } = lazyConfig[key]
    itemConfig.value[key].loading = true
    service().then((result) => {
      render(result)
    }).finally(() => {
      itemConfig.value[key].loading = false
    })
  }

  return {
    config: renderConfig,
    handleRenderCb,
  }
}
