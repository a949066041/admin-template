import type { MaybeRefOrGetter } from 'vue'
import type { IPropsUpload } from './index'

export interface IUseFileUpload {
  multiple?: MaybeRefOrGetter<boolean>
  action: IPropsUpload['action']
  size?: MaybeRefOrGetter<IPropsUpload['size']>
  name: MaybeRefOrGetter<IPropsUpload['name']>
}
export function useFileUpload(options?: IUseFileUpload) {
  options = {
    multiple: false,
    ...options,
  }
}
