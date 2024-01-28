import { createPinia } from 'pinia'

const $pinia = createPinia()

export * from './user'
export * from './config'
export * from './request-cache'
export {
  $pinia,
}
