import type { App } from 'vue'
import { createVNodeDirectives } from '@yy-admin/common-core'
import { NSpin } from 'naive-ui'
import { h } from 'vue'
import VueVirtualScroller from 'vue-virtual-scroller'
import DynamicVirtual from './components/dynamic-virtual/index.vue'
import GithubCorner from './components/github-corner/index.vue'
import { LazyBox } from './components/lazy'
import BaseUpload from './components/upload/index.vue'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

export * from './components/lazy'

export default function install(app: App) {
  app.use(VueVirtualScroller)
  app.component(DynamicVirtual.name, DynamicVirtual)
  app.directive('loading', createVNodeDirectives(h(NSpin, { delay: 1000 })))
  app.component(LazyBox.name, LazyBox)
  app.component(GithubCorner.name, GithubCorner)
  app.component(BaseUpload.name, BaseUpload)
}
