import { createApp } from 'vue'
import '@yy-admin/common-css'

import { Layout, setupAdmin } from '@yy-admin/components-admin'
import { pageList } from '@yy-admin/web-monitor'
import App from './App.vue'

const app = createApp(App)

setupAdmin(app, { ...import.meta.glob('@/views/**/*.vue'), ...pageList() }, {
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
      component: () => import('./dashboard.vue'),
    },
  ],
})

app.mount('#app')
