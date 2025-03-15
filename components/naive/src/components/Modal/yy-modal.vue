<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { NButton, NModal, NSpace } from 'naive-ui'

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
  <NModal v-model:show="bindVisible" class=" w-200" :title="title" preset="card">
    <slot />
    <template #action>
      <div class=" flex justify-end">
        <NSpace>
          <NButton @click="handleCancelModal">
            {{ cancelText }}
          </NButton>
          <NButton type="primary" :loading="confirmLoading" @click="emits('ok')">
            {{ confirmText }}
          </NButton>
        </NSpace>
      </div>
    </template>
  </NModal>
</template>
