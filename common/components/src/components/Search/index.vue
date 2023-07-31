<script lang="ts" setup>
const emit = defineEmits(['search', 'reset'])

defineOptions({
  name: 'YySearch',
})
</script>

<template>
  <a-form v-bind="$attrs" class="px-2 pt-4 bg-white rounded dark:bg-[#001529]" layout="inline">
    <slot />
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="emit('search')">
          查询
        </a-button>
        <a-button @click="emit('reset')">
          重置
        </a-button>
      </a-space>
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
