<script lang="ts" setup>
defineOptions({
  name: 'YySearch',
})

const emit = defineEmits(['search', 'reset'])
</script>

<template>
  <Form v-bind="$attrs" class="px-2 pt-4 rounded" inline>
    <slot />
    <FormItemItem>
      <Space>
        <Button type="primary" @click="emit('search')">
          查询
        </Button>
        <Button @click="emit('reset')">
          重置
        </Button>
      </Space>
    </FormItemItem>
  </Form>
</template>
