import type { IAxiosRequestConfig } from '@yy-web/request'
import request, { fileInterceptorsResponseConfig, getStore, setStore } from '@yy-web/request'
import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { getToken } from '../utils/token'

const service = axios.create({
  baseURL: '/api',
})

service.interceptors.request.use((config: InternalAxiosRequestConfig & IAxiosRequestConfig) => {
  const yyToken = getToken()
  if (yyToken && config && config.headers)
    config.headers.Authorization = config.headers.Authorization || `Bearer ${yyToken}`

  return config
})

service.interceptors.response.use((response: any) => {
  const { isFile, value } = fileInterceptorsResponseConfig(response)
  if (isFile)
    return value

  return response.data
})

export default request(service, { getStore, setStore })
