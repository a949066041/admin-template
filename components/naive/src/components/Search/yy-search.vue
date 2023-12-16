<script lang="ts" setup>
defineOptions({
  name: 'YySearch',
})

const emit = defineEmits(['search', 'reset'])
</script>

<template>
  <n-form v-bind="$attrs" :show-label="false" class=" rounded border-b border-b-dashed border-b-gray-100" inline>
    <slot />
    <n-form-item>
      <n-space>
        <n-button type="primary" @click="emit('search')">
          查询
        </n-button>
        <n-button @click="emit('reset')">
          重置
        </n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>
