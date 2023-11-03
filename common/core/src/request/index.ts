import type { IAxiosRequestConfig } from '@yy-web/request'
import request, { fileInterceptorsResponseConfig, getStore, setStore } from '@yy-web/request'
import type { InternalAxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import axios from 'axios'
import { useUserStore } from '../store'
import { getToken } from '../utils/token'

const service = axios.create({
  baseURL: '/api',
})

service.interceptors.request.use((config: InternalAxiosRequestConfig & IAxiosRequestConfig) => {
  const yyToken = getToken()
  if (yyToken && config && config.headers)
    config.headers.Authorization = config.headers.Authorization || yyToken

  return config
})

service.interceptors.response.use((response: any) => {
  const { isFile, value } = fileInterceptorsResponseConfig(response)
  if (isFile)
    return value

  return response.data
}, (error) => {
  if (error.response) {
    const user = useUserStore()
    switch (error.response.status) {
      case 401:
        user.logout()
        break
      default: {
        const errorMsg = error.response.data.message
        message.error(errorMsg)
      }
    }
  }
  return Promise.reject(error)
})

const yyRequest = request(service, {
  getStore,
  setStore,
  cancelRepeat: true,
})

export default yyRequest
