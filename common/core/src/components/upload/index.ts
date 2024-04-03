export interface IPropsUpload {
  name?: string
  size?: number
  action: (file: File) => Promise<unknown>
  ext?: string[]
}

export { default as SingleUpload } from './single-upload.vue'
