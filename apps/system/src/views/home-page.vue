<script lang="ts" setup>
import { useLeaveConfirm } from '@yy-admin/components-admin'
import IndicatorCard from './home/indicator-card.vue'

defineOptions({
  name: 'Home',
})

const leaveFlag = ref(false)

useLeaveConfirm('确定离开吗？', leaveFlag)
</script>

<template>
  <div>
    页面离开提醒<n-switch v-model:value="leaveFlag" />
    <IndicatorCard />
  </div>
</template>
