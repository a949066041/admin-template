<script lang="ts" setup>
defineOptions({
  name: 'IndicatorCardItem',
})

withDefaults(defineProps<{ title: string, value: number, suffix?: string, prefix?: string }>(), { suffix: '', prefix: '' })
</script>

<template>
  <div class=" card-item">
    <div class=" flex justify-between">
      <span class=" op65">{{ title }}</span>
      <i class="i-ph:question-light" />
    </div>
    <div class=" text-3xl">
      {{ prefix }}<n-number-animation :from="0" :to="value" show-separator />{{ suffix }}
    </div>
    <slot />
    <CardReuseTemplate class="min-h-11.5" />
    <n-divider class="!my-2" />
    <slot name="footer" />
  </div>
</template>

<style lang="less" scoped>
.card-item {
  @apply px-24px pt-20px pb-8px rounded-xl
    shadow-[0_1px_2px_0_rgba(0,0,0,0.03),0_1px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_0_rgba(0,0,0,0.02)]
    border
    border-solid
    dark:border-color-[rgba(255,255,255,0.09)]
    border-color-[rgb(239,239,245)];
}
</style>
