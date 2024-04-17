import { ApiInstance } from '../instance'

const baseApi = '/api/localStorage'

class LocalStorageApiInstance extends ApiInstance {
  baseApi = baseApi

  constructor() {
    super()
    this.upload = this.upload.bind(this)
  }

  upload(file: File, onUploadProgress?: (progress: number) => void) {
    return this.$request.setPath(`${this.baseApi}`).setConfig(({
      onUploadProgress(e) {
        if (e)
          onUploadProgress?.(Math.round((e.loaded * 100) / (e.total || 0)))
      },
    })).upload(file, { name: file.name })
  }
}

export const LocalStorageApi = new LocalStorageApiInstance()
