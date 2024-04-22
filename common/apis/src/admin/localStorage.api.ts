import { ApiInstance } from '../instance'
import type { ILocalStorageEntity } from './localStorage.type'

const baseApi = '/api/localStorage'

class LocalStorageApiInstance extends ApiInstance {
  baseApi = baseApi

  constructor() {
    super()
    this.upload = this.upload.bind(this)
  }

  upload(file: File, onUploadProgress?: (progress: number) => void) {
    return this.$request.setPath(`${this.baseApi}/uploadObs`).setConfig(({
      onUploadProgress(e) {
        if (e)
          onUploadProgress?.(Math.round((e.loaded * 100) / (e.total || 0)))
      },
    })).upload<ILocalStorageEntity>(file)
  }
}

export const LocalStorageApi = new LocalStorageApiInstance()
