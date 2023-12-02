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
      <Select v-if="type === 'select'" v-model:value="bindValue" :options="[]" />
      <RadioGroup v-if="type === 'radio'" v-model:value="bindValue" v-bind="$attrs" :loading="loading">
        <Radio v-for="item in data" :key="item.value" :label="item.value">
          {{ item.label }}
        </Radio>
      </RadioGroup>
    </template>
  </YyDict>
</template>
