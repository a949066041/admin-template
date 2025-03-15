import type { DropdownProps } from 'naive-ui'
import type { IRouteTag } from '../../../../store/tag.store'
import { useToggle } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useTagStore } from '../../../../store/tag.store'

export function useContextTag() {
  const [showDrop, toggleShowDrop] = useToggle()
  const position = ref({ x: 0, y: 0 })
  const tagStore = useTagStore()
  const currentTag = ref<IRouteTag | null>(null)

  const bindDrop = computed<DropdownProps>(() => ({
    ...position.value,
    trigger: 'manual',
    show: showDrop.value,
    onClickoutside: handleClickoutside,
    options: [
      { key: 'closeAll', label: '关闭全部' },
      { key: 'close', label: '关闭' },
      { key: 'refresh', label: '刷新', disabled: currentTag.value?.path !== tagStore.activeTag },
    ],
    onSelect: (key) => {
      if (key === 'refresh')
        tagStore.refresh(currentTag.value!.path)

      else if (key === 'closeAll')
        tagStore.closeAll()
      else if (key === 'close')
        tagStore.closeTag(currentTag.value!.path)

      handleClickoutside()
    },
  }))

  function handleOpenMenu(e: MouseEvent, tag: IRouteTag) {
    e.preventDefault()
    toggleShowDrop(true)
    currentTag.value = tag

    position.value = {
      x: e.clientX,
      y: e.clientY,
    }
  }

  function handleClickoutside() {
    toggleShowDrop(false)
    currentTag.value = null
  }

  return {
    bindDrop,
    handleOpenMenu,
  }
}
