<script lang="ts" setup>
import { NButton, NForm, NFormItem, NSpace } from 'naive-ui'

defineOptions({
  name: 'YySearch',
})

withDefaults(defineProps<{ loading?: boolean }>(), { loading: false })

const emit = defineEmits(['search', 'reset'])
</script>

<template>
  <NForm v-bind="$attrs" :show-label="false" class=" rounded border-b border-b-dashed border-b-gray-100" inline>
    <slot />
    <NFormItem>
      <NSpace>
        <NButton type="primary" :loading="loading" @click="emit('search')">
          查询
        </NButton>
        <NButton @click="emit('reset')">
          重置
        </NButton>
      </NSpace>
    </NFormItem>
  </NForm>
</template>
