export interface IPropsUpload {
  name?: string
  size?: number
  action: (file: File, uploadProgress?: (progress: number) => void) => Promise<{ path: string, name: string }>
  ext?: string[]
}

export { default as SingleUpload } from './single-upload.vue'
