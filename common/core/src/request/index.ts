import request from '@yy-web/request'
import axios from 'axios'
import { $pinia, useRequestCache, useUserStore } from '../store'
import { requestInterceptors } from './request.interceptors'
import { responseInterceptors, responseInterceptorsError } from './response.interceptors'

const service = axios.create({
  baseURL: '/api',
})

service.interceptors.request.use(requestInterceptors)
service.interceptors.response.use(responseInterceptors, responseInterceptorsError)

const requestStore = useRequestCache($pinia)
const yyRequest = request(service, {
  getStore: requestStore.getStore,
  setStore: requestStore.setStore,
  cancelRepeat: true,
  maxConcurrentNum: 5,
})

export default yyRequest
