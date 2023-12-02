<script lang="ts" setup>
import { watchOnce } from '@vueuse/shared'
import { watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { Contextmenu } from 'vexip-ui'
import { first } from 'lodash-es'
import type { IRouteTag } from '../../../../store/tag.store'
import { useTagStore } from '../../../../store/tag.store'

defineOptions({
  name: 'RouteTags',
})

const tagStore = useTagStore()

const route = useRoute()
const router = useRouter()
watch(() => tagStore.activeTag, (tag) => {
  if (tag)
    router.push(tag)
})

function handleAddTag(routeInfo: RouteLocationNormalizedLoaded) {
  tagStore.addTag({ path: routeInfo.path, title: routeInfo.meta.title as string, affix: !!routeInfo.meta.affix, name: routeInfo.name as string })
}

async function handleContextTag(event: MouseEvent, tag: IRouteTag) {
  const selectedKeys = await Contextmenu.open({
    clientX: event.clientX,
    clientY: event.clientY,
    appear: true,
    configs: [{ key: 'closeAll', label: '关闭全部' }, { key: 'close', label: '关闭' }],
  })

  const action = first(selectedKeys)
  if (action) {
    if (action === 'refresh')
      tagStore.refresh(tag.name)
    else if (action === 'closeAll')
      tagStore.closeAll()
    else if (action === 'close')
      tagStore.closeTag(tag.path)
  }
}

watchOnce(() => route, handleAddTag, { immediate: true })
router.afterEach(handleAddTag)
</script>

<template>
  <Tabs
    v-model:active="tagStore.activeTag"
    type="card" class="!mb-0"
    @tab-click="tagStore.switchTag"
  >
    <TabPanel v-for="item of tagStore.tagList" :key="item.path" :label="item.path">
      <template #label>
        <div class="router-tab flex items-center" @contextmenu.prevent="($event) => handleContextTag($event, item)">
          <span>
            {{ item.title }}
          </span>
          <i-carbon:close-outline v-if="!item.affix" class="router-tab__icon" @click.stop="tagStore.closeTag(item.path)" />
        </div>
      </template>
    </TabPanel>
  </Tabs>
</template>

<style scoped lang="less">
.router-tab {
  &:hover {
    .router-tab__icon {
      @apply block;
    }
  }

  &__icon {
    @apply cursor-pointer ml-2;
  }
}
</style>
