<script lang="ts" setup>
defineOptions({
  name: 'DashboardHome',
})
</script>

<template>
  <div>
    <GithubCorner class=" absolute right-0 top-0 z-1" />
    <n-grid>
      <n-gi :span="6">
        <i-solar:user-broken />
        <n-number-animation :from="0" :to="12039" />
      </n-gi>
      <n-gi :span="6">
        <i-icon-park-outline:message />
        <n-number-animation :from="0" :to="12039" />
      </n-gi>
    </n-grid>

    <i-solar:dollar-bold-duotone />
    <i-icon-park-outline:shopping />
  </div>
</template>
