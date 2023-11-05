<script lang="ts" setup>
withDefaults(defineProps<{ size: string; background: string }>(), { size: '40px', background: '#41b883' })
</script>

<template>
  <div class="lds-facebook">
    <div /><div /><div />
  </div>
</template>

<style scoped lang="less">
.lds-facebook {
  @apply inline-block relative w-20 h-20 scale-200;

  > div {
    @apply absolute inline-block left-2 w-4 bg-[#1677ff] rounded;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

    &:nth-child(1) {
      animation-delay: -0.2s;
    }
    &:nth-child(2) {
      @apply left-8 animate--0.12s;
    }
    &:nth-child(3) {
      @apply left-14;
      animation-delay: 0;
    }
  }
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}
</style>
