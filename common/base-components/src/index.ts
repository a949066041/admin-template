import type { App } from 'vue-demi'
import { createVNodeDirectives } from '@yy-admin/common-core'
import Loading from './components/loading/index.vue'

export default function install(app: App) {
  app.directive('loading', createVNodeDirectives(Loading))
}
