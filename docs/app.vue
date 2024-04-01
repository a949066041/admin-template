<script lang="ts" setup>
import type { ConfigProviderProps } from 'naive-ui'
import { darkTheme, lightTheme } from 'naive-ui'
import '@shikijs/twoslash/style-rich.css'

const colorMode = useColorMode()

const configProps = computed<ConfigProviderProps>(() => ({
  theme: colorMode.value === 'light' ? lightTheme : darkTheme,
}))
</script>

<template>
  <n-config-provider v-bind="configProps" inline-theme-disabled>
    <NuxtLayout>
      <n-global-style />
      <NuxtPage />
    </NuxtLayout>
  </n-config-provider>
</template>
