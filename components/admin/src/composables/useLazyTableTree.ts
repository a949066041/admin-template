import { ref } from 'vue'

export interface IUseLazyTableTreeOptions<T> {
  onLoad: (item: T) => Promise<T[]>
  onLoadRoot: () => void
}

export function useLazyTableTree<T extends { id: number }>(options: IUseLazyTableTreeOptions<T>) {
  const openTreeMap = ref<Map<number, T>>(new Map())
  const openKeys = ref<number[]>([])

  function resetOpenKeys() {
    openKeys.value = []
    openTreeMap.value = new Map()
  }

  function renderKeys(row: T) {
    return row.id
  }

  function lazyLoad(row: T) {
    return new Promise((resolve) => {
      options.onLoad(row).then((res: T[]) => {
        const childrenIds = res.map(item => item.id)
        openKeys.value = openKeys.value.filter(item => !childrenIds.includes(item))
        openTreeMap.value.set(row.id, row as any)
        resolve(childrenIds)
      })
    })
  }

  function handleRefreshLoadTree(pid?: number) {
    if (pid && openTreeMap.value.has(pid)) {
      const openTree = openTreeMap.value.get(pid) as T
      lazyLoad(openTree)
      return
    }
    options.onLoadRoot()
    resetOpenKeys()
  }

  return {
    renderKeys,
    openKeys,
    lazyLoad,
    resetOpenKeys,
    handleRefreshLoadTree,
  }
}
