<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { YyDict } from '@yy-admin/common-core'

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
      <n-select v-if="type === 'select'" v-model:value="bindValue" class=" min-w-100px" clearable :options="data" :loading="loading" />
      <n-radio-group v-if="type === 'radio'" v-model:value="bindValue" v-bind="$attrs" :loading="loading">
        <n-radio-button v-for="item in data" :key="item.value" :value="item.value">
          {{ item.label }}
        </n-radio-button>
      </n-radio-group>
    </template>
  </YyDict>
</template>
