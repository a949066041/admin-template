<script lang="ts" setup>
defineOptions({
  name: 'GeneratorConfig',
})

const value = ref('')
</script>

<template>
  <div>
    <n-input v-model:value="value" />
    {{ $route.params.tableName }}
  </div>
</template>
