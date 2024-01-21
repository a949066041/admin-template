<script lang="ts" setup>
import IndicatorCard from './home/indicator-card.vue'

defineOptions({
  name: 'Home',
})
</script>

<template>
  <div>
    <div v-for="item of ['sys_users_roles', 'mnt_app']" :key="item" @click="$router.push(`/sys-tools/generator/config/${item}`)">
      {{ item }}
    </div>
    <IndicatorCard />
  </div>
</template>
