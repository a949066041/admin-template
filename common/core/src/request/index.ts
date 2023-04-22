import type { IAxiosRequestConfig } from '@yy-web/request'
import request, { fileInterceptorsResponseConfig, getStore, setStore } from '@yy-web/request'
import type { InternalAxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import axios from 'axios'
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
    switch (error.response.status) {
      case 401:
        // 提示用户登录
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
  getStore, setStore,
})

export default yyRequest
