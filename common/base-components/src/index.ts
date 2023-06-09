import type { App } from 'vue-demi'
import { createVNodeDirectives } from '@yy-admin/common-core'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import Loading from './components/loading/index.vue'
import DynamicVirtual from './components/dynamic-virtual/index.vue'

export default function install(app: App) {
  app.use(VueVirtualScroller)
  app.component(DynamicVirtual.name, DynamicVirtual)
  app.directive('loading', createVNodeDirectives(Loading))
}
