import type { AxiosProgressEvent } from 'axios'

type basicKeyType = string | number | symbol

export type AppendToObject<T, K extends basicKeyType, V> = {
  [P in keyof T | K]: P extends keyof T ? T[P] : V
}

export type Merge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never
}

export type UploadCb = (value: number) => void
export const uploadProgress = (cb: (value: number) => void) => (progress: AxiosProgressEvent) => cb(Math.floor(progress!.loaded / (progress.total || 0) * 100))
