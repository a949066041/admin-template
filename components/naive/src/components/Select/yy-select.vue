<script lang="ts" setup>
import type { SelectProps } from 'naive-ui'
import { useVModel } from '@vueuse/core'
import { NSelect } from 'naive-ui'
import { selectProps } from './select.type'

defineOptions({
  name: 'YySelect',
})

const props = defineProps<{ value: SelectProps['value'], options: SelectProps['options'] }>()

const bindValue = useVModel(props, 'value')
</script>

<template>
  <NSelect
    v-bind="{ ...selectProps, ...$attrs }"
    v-model:value="bindValue"
    :options="options"
  />
</template>
