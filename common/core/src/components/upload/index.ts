export interface IPropsUpload {
  name?: string
  size?: number
  action: (file: File, uploadProgress?: (progress: number) => void) => Promise<unknown>
  ext?: string[]
}

export { default as SingleUpload } from './single-upload.vue'
