import type { IAxiosRequestConfig } from '@yy-web/request'
import type { InternalAxiosRequestConfig } from 'axios'
import { tokenStorage } from '../utils/cookie'

export function requestInterceptors(config: InternalAxiosRequestConfig & IAxiosRequestConfig) {
  const yyToken = tokenStorage.getValue()
  if (yyToken && config && config.headers)
    config.headers.Authorization = config.headers.Authorization || yyToken

  return config
}
