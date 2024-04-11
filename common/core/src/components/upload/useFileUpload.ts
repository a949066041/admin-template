import { type MaybeRefOrGetter, computed, ref, toValue } from 'vue'
import { useFileDialog } from '@vueuse/core'
import type { IPropsUpload } from './index'

export interface IUseFileUpload {
  multiple?: MaybeRefOrGetter<boolean>
  action: IPropsUpload['action']
  size?: MaybeRefOrGetter<IPropsUpload['size']>
  name: MaybeRefOrGetter<IPropsUpload['name']>
  limit?: number
}

export interface IFileItem {
  name: string
  size: number
  type: string
  progress: number
}

export function useFileUpload(options: IUseFileUpload) {
  const _options = {
    multiple: false,
    limit: 1,
    ...options,
  } as Required<IUseFileUpload>

  const fileList = ref<IFileItem[]>([])
  const { open, reset, onChange } = useFileDialog({
    multiple: toValue(_options.multiple),
    directory: toValue(_options.multiple),
  })

  const isUploadFile = computed(() => fileList.value
    .filter(item => typeof item.progress !== 'undefined')
    .map(item => item.progress !== 100).length !== 0)
  const isOverstepLimit = computed(() => fileList.value.length >= _options.limit)

  function handleUploadFile() {
    reset()
    open()
  }

  onChange((file) => {
    if (!file || file.length === 0)
      return

    if (isUploadFile.value) {
      window.errorMsg('文件未上传完毕')
      reset()
    }
    // 过滤
    if (isOverstepLimit.value) {
      window.errorMsg('文件数量超出')
      reset()
    }

    _options.action(file[0]).then((res) => {
      console.log(res)
    })
  })

  return {
    handleUploadFile,
  }
}
