<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useIntersectionObserver, useToggle } from '@vueuse/core'

defineOptions({
  name: 'LazyBox',
})

const props = withDefaults(defineProps<{ title: string, height: string | number, name: string, effectData?: any, loading?: boolean }>(), {
  effectData: () => ({}),
  loading: false,
})

const emits = defineEmits<{
  render: [name: string]
}>()

const contentHeight = computed(() => {
  return typeof props.height === 'number' ? `${props.height}px` : props.height
})

const content = ref<HTMLElement>()
const [render, toggleRender] = useToggle<boolean>()
const [intersecting, toggleIntersecting] = useToggle()
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
  if (intersecting.value)
    emits('render', props.name)
})
</script>

<template>
  <div ref="content" v-loading="loading" class="flex flex-col rounded ">
    <div class="box-border" :style="{ height: contentHeight }">
      <slot />
    </div>
  </div>
</template>
