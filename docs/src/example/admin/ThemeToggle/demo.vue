<script lang="ts" setup>
import { ThemeToggle } from '@yy-admin/components-admin'
import { useConfigStore } from '@yy-admin/common-core'

const configStore = useConfigStore()
</script>

<template>
  <div>
    <div class="flex">
      <span>状态：</span><span v-if="!configStore.isDark" class="i-line-md:sun-rising-loop text-black flex w-20 h-20" /><span v-else class="i-line-md:moon-rising-loop flex w-20 h-20" />
    </div>
    <ThemeToggle>
      <template #default="{ toggle }">
        <n-button @click="toggle">
          点击切换
        </n-button>
      </template>
    </ThemeToggle>
  </div>
</template>
