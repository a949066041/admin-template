import { ApiInstance } from '../instance'

const baseApi = '/api/localStorage'

class LocalStorageApiInstance extends ApiInstance {
  baseApi = baseApi

  constructor() {
    super()
    this.upload = this.upload.bind(this)
  }

  upload(file: File, name: string = 'xxx.jpg') {
    return this.$request.setPath(`${this.baseApi}?name=${name}`).upload(file, { name })
  }
}

export const LocalStorageApi = new LocalStorageApiInstance()
