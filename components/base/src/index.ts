import { type App, h } from 'vue'
import { createVNodeDirectives } from '@yy-admin/common-core'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { NSpin } from 'naive-ui'
import DynamicVirtual from './components/dynamic-virtual/index.vue'
import { LazyBox } from './components/lazy'
import GithubCorner from './components/github-corner/index.vue'

export * from './components/lazy'

export default function install(app: App) {
  app.use(VueVirtualScroller)
  app.component(DynamicVirtual.name, DynamicVirtual)
  app.directive('loading', createVNodeDirectives(h(NSpin, { delay: 1000 })))
  app.component(LazyBox.name, LazyBox)
  app.component(GithubCorner.name, GithubCorner)
}
