import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const MAX_KEEP = 100

export interface IRouteTag {
  path: string
  title: string
  name: string
  affix?: boolean
}

export const useTagStore = defineStore('admin-tag', () => {
  const tagList = ref<IRouteTag[]>(Array.from({ length: 0 }, (_, i) => ({ path: `/${i}`, title: `标签${i}`, name: `tag${i}` })))
  const activeTag = ref<IRouteTag['path']>('')
  const refreshing = ref<string | null>(null)
  const renderList = computed(() => {
    return [
      {
        path: '/',
        title: '首页',
        affix: true,
        name: 'Home',
      },
      ...tagList.value,
    ]
  })

  const keepAliveNames = computed(() => {
    return renderList.value.map(item => item.name).filter(item => refreshing.value !== item)
  })

  function switchTag(value: IRouteTag['path']) {
    if (activeTag.value !== value)
      activeTag.value = value
  }

  function addTag(routerInfo: IRouteTag) {
    activeTag.value = routerInfo.path
    if (renderList.value.some(item => item.path === routerInfo.path))
      return

    tagList.value.push(routerInfo)
    if (tagList.value.length > MAX_KEEP)
      tagList.value.shift()
  }

  function delTag(path: IRouteTag['path'], cb: () => void) {
    const lastIndex = tagList.value.findIndex(tag => tag.path === path) - 1

    cb()

    if (tagList.value.length === 0) {
      activeTag.value = '/'
      return
    }

    if (tagList.value.length > 0 && activeTag.value === path)
      activeTag.value = tagList.value[lastIndex]?.path || '/'
  }

  function closeRight(path: IRouteTag['path']) {
    const tagIndex = tagList.value.findIndex(tag => tag.path === path)
    if (tagIndex === -1)
      return
    tagList.value = tagList.value.slice(0, tagIndex)
    if (path === activeTag.value)
      activeTag.value = tagList.value[tagList.value.length - 1]?.path || '/'
  }

  function closeTag(path: IRouteTag['path']) {
    delTag(path, () => {
      tagList.value = tagList.value.filter(item => item.path !== path)
    })
  }

  function refresh(routeName: string) {
    refreshing.value = routeName
    setTimeout(() => {
      refreshing.value = null
    }, 300)
  }

  function closeAll() {
    delTag('', () => {
      tagList.value = []
    })
  }

  return {
    keepAliveNames,
    refreshing,
    activeTag,
    tagList: renderList,
    refresh,
    switchTag,
    addTag,
    closeTag,
    closeAll,
    closeRight,
  }
})
