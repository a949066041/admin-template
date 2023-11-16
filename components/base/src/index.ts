import type { App } from 'vue'
import { createVNodeDirectives } from '@yy-admin/common-core'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import Loading from './components/loading/index.vue'
import DynamicVirtual from './components/dynamic-virtual/index.vue'
import { LazyBox } from './components/lazy'

export * from './components/lazy'

export default function install(app: App) {
  app.use(VueVirtualScroller)
  app.component(DynamicVirtual.name, DynamicVirtual)
  app.directive('loading', createVNodeDirectives(Loading))
  app.component(LazyBox.name, LazyBox)
}
