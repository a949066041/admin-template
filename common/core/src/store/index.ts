import { createPinia } from 'pinia'

const $pinia = createPinia()

export * from './config'
export * from './request-cache'
export * from './user'
export {
  $pinia,
}
