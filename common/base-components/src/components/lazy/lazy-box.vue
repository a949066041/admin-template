<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useIntersectionObserver, useToggle } from '@vueuse/core'
import { useCurrentElement } from '@vueuse/core';


const props = withDefaults(defineProps<{ title: string; height: string | number; name: string; effectData?: any }>(), {
  effectData: () => ({})
})

const contentHeight = computed(() => {
  return typeof props.height === 'number'? `${props.height}px` : props.height;
});

const content = useCurrentElement<HTMLElement>()
const [render, toggleRender] = useToggle<boolean>()
const [intersecting, toggleIntersecting] = useToggle()
const emits = defineEmits<{
  render: [string]
}>()

useIntersectionObserver(content, (entry) => {
  const [{ isIntersecting }] = entry
  toggleIntersecting(isIntersecting)
  if (isIntersecting && !render.value) {
    toggleRender(true)
    emits('render', props.name)
  }
})

watch(() => props.effectData, () => {
  toggleRender(intersecting.value)
  if (intersecting.value) {
    emits('render', props.name)
  }
})

defineOptions({
  name: 'LazyBox',
})
</script>

<template>
  <div class=" flex flex-col bg-white rounded">
    <div class=" px-4 py-2 border-b border-b-solid border-b-orange-400">
      {{ title }}
    </div>
    <div class="overflow-hidden box-border p-2" :style="{ height: contentHeight }">
      <slot />
    </div>
  </div>
</template>
