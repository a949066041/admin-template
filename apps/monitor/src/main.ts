import { Layout, setupAdmin } from '@yy-admin/components-admin'
import { createApp } from 'vue'

import App from './App.vue'
import { monitorPageList } from './page'
import '@yy-admin/common-css'

const app = createApp(App)

setupAdmin(app, monitorPageList(), {
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
      component: () => import('./views/online/index.vue'),
    },
  ],
})

app.mount('#root')
