import { computed, ref } from 'vue'


export interface IRouteTag {
  path: string;
  title: string;
  affix?: boolean;
}

export interface IUseTagOptions {
  max?: number;
}

export function useTag(options?: IUseTagOptions) {
  const {
    max
  } = { max: 10, ...options }
  const tagList = ref<IRouteTag[]>([])
  const activeTag = ref<IRouteTag['path']>('')

  const renderList = computed(() => {
    return [
      {
        path: '/',
        title: '首页',
        affix: true
      },
      ...tagList.value
    ]
  })

  function switchTag(value: IRouteTag['path']) {
    if (activeTag.value !== value) {
      activeTag.value = value
    }
  }

  function addTag(routerInfo: IRouteTag) {
    activeTag.value = routerInfo.path
    if (renderList.value.some(item => item.path === routerInfo.path)) {
      return
    }
    tagList.value.push(routerInfo)
    if (tagList.value.length > max) {
      tagList.value.shift()
    }
  }

  function delTag(path: IRouteTag['path'], cb: () => void) {
    const lastIndex = tagList.value.findIndex(tag => tag.path === path) - 1;

    cb()

    if (tagList.value.length === 0) {
      activeTag.value = '/'
      return
    }

    if (tagList.value.length > 0 && activeTag.value === path) {
      activeTag.value = tagList.value[lastIndex]?.path || '/'
    }
  }

  function closeRight(path: IRouteTag['path']) {
    delTag(path, () => {
      const tagIndex = tagList.value.findIndex(tag => tag.path === path)
      tagList.value = tagList.value.slice(0, tagIndex)
    })
  }

  function closeTag(path: IRouteTag['path']) {
    delTag(path, () => {
      tagList.value = tagList.value.filter(item => item.path !== path)
    })
  }

  function closeAll() {
    delTag('', () => {
      tagList.value = []
    })
  }

  return {
    activeTag,
    tagList: renderList,
    switchTag,
    addTag,
    closeTag,
    closeAll,
    closeRight
  }
}