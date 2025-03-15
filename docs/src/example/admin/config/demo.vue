<script lang="ts" setup>
import { AppConfig } from '@yy-admin/components-admin'

const title = ref('项目标题')
</script>

<template>
  <AppConfig :title="title">
    <div class=" flex items-center mb-2">
      修改项目标题
      <n-input v-model:value="title" class=" !w-60" />
    </div>

    <div class=" flex items-center">
      国际化统一
      <n-date-picker class=" !w-60" />
    </div>
  </AppConfig>
</template>
