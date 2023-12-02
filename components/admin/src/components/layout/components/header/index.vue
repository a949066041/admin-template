<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { useBreadcrumb } from './useBreadcrumb'

defineOptions({
  name: 'YyHeader',
})

const props = defineProps<{
  showAside: boolean
}>()

const bindShowAside = useVModel(props, 'showAside')
const { breadcrumbList } = useBreadcrumb()
</script>

<template>
  <Breadcrumb class=" ml-4">
    <BreadcrumbItem v-for="item of breadcrumbList" :key="item.path">
      <Dropdown>
        <a type="link">
          {{ item.name }}
        </a>
        <template v-if="item.children && item.children.length > 0" #drop>
          <DropdownList>
            <DropdownItem v-for="innerItem of item.children" :key="innerItem.path" :name="innerItem.path">
              <a @click="$router.push(innerItem.path)">
                {{ innerItem.name }}
              </a>
            </DropdownItem>
          </DropdownList>
        </template>
      </Dropdown>
    </BreadcrumbItem>
  </Breadcrumb>

  <Switch v-model:value="bindShowAside" open-text="显示侧边栏" close-text="隐藏侧边栏" />
</template>
