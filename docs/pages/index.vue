<script setup lang="ts">
const data = await $fetch('/api/hello')
</script>

<template>
  <div class=" w-full flex  flex-wrap ">
    <div v-for="item of data" :key="item.id" class="  w-[25%] flex flex-col items-center">
      <img :src="item.thumbnailUrl" class=" w-40 h-40">
      <span class=" mt-2">{{ item.title }}</span>
    </div>
  </div>
</template>

<style></style>
