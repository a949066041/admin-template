<script lang="ts" setup>
const colorMode = useColorMode()

function toggleDark() {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class=" h-10  flex items-center px-5 justify-between">
    <div class=" flex items-center">
      <img src="~/assets/logo.svg" class=" w-8 relative top-1" alt="logo">
      <n-gradient-text :size="24" type="success" class=" ml-2">
        yy-web
      </n-gradient-text>
    </div>
    <div class=" flex-1 flex justify-center">
      <n-space>
        <nuxt-link>
          <n-button quaternary type="primary">
            介绍
          </n-button>
        </nuxt-link>
        <nuxt-link to="components/">
          <n-button quaternary type="primary">
            组件库
          </n-button>
        </nuxt-link>
        <nuxt-link>
          <n-button quaternary type="primary">
            业务库
          </n-button>
        </nuxt-link>
      </n-space>
    </div>
    <div class=" text-xl cursor-pointer i-line-md:sun-rising-loop dark:i-line-md:moon-rising-loop translate-y--1px" @click="toggleDark" />
  </div>
</template>
