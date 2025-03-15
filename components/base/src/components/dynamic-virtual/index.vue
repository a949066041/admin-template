<script lang="ts" setup>
defineOptions({
  name: 'DynamicVirtual',
})

withDefaults(defineProps<{
  depKey?: string
  wrapperClass?: string
  minItemSize?: number
}>(), {
  depKey: 'id',
  minItemSize: 20,
  wrapperClass: '',
})
</script>

<template>
  <DynamicScroller
    v-bind="$attrs"
    :min-item-size="minItemSize"
    class="h-full overflow-hidden"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[
          item[depKey],
        ]"
        :data-index="index"
        :data-active="active"
        :class="wrapperClass"
        :style="{ minHeight: `${minItemSize}px` }"
      >
        <slot v-bind="{ item, active, index }" />
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
