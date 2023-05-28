<script lang="ts" setup>
const emit = defineEmits(['search', 'reset'])

defineOptions({
  name: 'YySearch',
})
</script>

<template>
  <a-form v-bind="$attrs" layout="inline">
    <slot />
    <a-form-item>
      <a-button type="primary" @click="emit('search')">
        查询
      </a-button>
      <a-button @click="emit('reset')">
        重置
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped>
  .ant-form {
    :deep(.ant-form-item) {
      @apply mb-4;

      .ant-select,
      .ant-input {
        @apply min-w-300px;
      }
    }
  }
</style>
