<script lang="ts" setup>
defineOptions({
  name: 'IndicatorText',
})

defineProps<{ label: string, value: string }>()

defineSlots<{
  'suffix-icon': any
}>()
</script>

<template>
  <span class=" flex items-center">
    <span>{{ label }} {{ value }}</span>
    <slot name="suffix-icon" />
  </span>
</template>
