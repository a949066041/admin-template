<script lang="ts" setup>
import { ThemeToggle } from '@yy-admin/components-admin'
import { useConfigStore } from '@yy-admin/common-core'

const configStore = useConfigStore()
</script>

<template>
  <div>
    <div class="flex">
      <span>状态：</span><span v-if="!configStore.isDark" class="i-carbon-sun text-black flex w-20 h-20" /><span v-else class="i-carbon-moon flex w-20 h-20" />
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
