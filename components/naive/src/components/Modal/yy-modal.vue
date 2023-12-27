<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

defineOptions({
  name: 'YyModal',
})

const props = withDefaults(defineProps<IYyModalProps>(), {
  title: '提示',
  confirmLoading: false,
  cancelText: '取消',
  confirmText: '确定',
})

const emits = defineEmits<{
  ok: []
}>()

interface IYyModalProps {
  visible: boolean
  title?: string
  cancelText?: string
  confirmLoading?: boolean
  confirmText?: string
}

const bindVisible = useVModel(props, 'visible')
function handleCancelModal() {
  bindVisible.value = false
}
</script>

<template>
  <n-modal v-model:show="bindVisible" class=" w-200" :title="title" preset="card">
    <slot />
    <template #action>
      <div class=" flex justify-end">
        <n-space>
          <n-button @click="handleCancelModal">
            {{ cancelText }}
          </n-button>
          <n-button type="primary" :loading="confirmLoading" @click="emits('ok')">
            {{ confirmText }}
          </n-button>
        </n-space>
      </div>
    </template>
  </n-modal>
</template>
