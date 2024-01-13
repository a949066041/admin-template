import { createApp } from 'vue'
import '@yy-admin/common-css'
import 'uno.css'

import { Layout, setupAdmin } from '@yy-admin/components-admin'
import { systemPageList } from './page'
import App from './App.vue'

const app = createApp(App)

setupAdmin(app, systemPageList(), {
  path: '/',
  name: 'about',
  component: Layout,
  children: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: '首页',
        affix: true,
      },
      component: () => import('./views/AboutView.vue'),
    },
  ],
})

app.mount('#app')
