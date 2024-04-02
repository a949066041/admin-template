export interface IPropsUpload {
  name?: string
  size?: number
  action: (file: File) => Promise<unknown>
  ext?: string[]
}
