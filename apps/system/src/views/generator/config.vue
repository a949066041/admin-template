<script lang="ts" setup>
import { useRoute } from 'vue-router'

defineOptions({
  name: 'GeneratorConfig',
})

const value = ref('')
</script>

<template>
  <n-input v-model:value="value" />
  <div>{{ $route.params.tableName }}</div>
</template>
