<script lang="ts" setup>
import { YyDict } from '@yy-admin/common-core'
import { useVModel } from '@vueuse/core'

defineOptions({
  name: 'YyDictSelect',
})

const props = withDefaults(defineProps<{ value: any, dict: string, transform?: 'boolean' | 'number' | '', type?: 'select' | 'radio' }>(), {
  transform: '',
  type: 'select',
})

const emits = defineEmits(['update:value'])
const bindValue = useVModel(props, 'value', emits)
</script>

<template>
  <YyDict :dict="dict" :transform="transform">
    <template #default="{ loading, data }">
      <a-select v-if="type === 'select'" v-model:value="bindValue" v-bind="$attrs" :loading="loading">
        <a-select-option v-for="item in data" :key="item.value" :value="item.value">
          {{ item.label }}
        </a-select-option>
      </a-select>
      <a-radio-group v-if="type === 'radio'" v-model:value="bindValue" v-bind="$attrs" :loading="loading">
        <a-radio v-for="item in data" :key="item.value" :value="item.value">
          {{ item.label }}
        </a-radio>
      </a-radio-group>
    </template>
  </YyDict>
</template>
