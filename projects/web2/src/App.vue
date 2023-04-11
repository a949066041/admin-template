<script setup lang="ts">
import { RouterView } from 'vue-router'
import { add } from '@yy-admin/common-utils'
</script>

<template>
  {{ add(1, 100) }}
  <RouterView />
</template>
