<script lang="ts" setup>
import type { SelectProps } from 'naive-ui'
import { useVModel } from '@vueuse/core'
import { treeSelectProps } from './select.type'

defineOptions({
  name: 'YyTreeSelect',
})

const props = defineProps<{ value: SelectProps['value'], options: SelectProps['options'] }>()

const bindValue = useVModel(props, 'value')
</script>

<template>
  <n-tree-select
    v-bind="{ ...treeSelectProps, ...$attrs }"
    v-model:value="bindValue"
    :options="options"
  />
</template>
