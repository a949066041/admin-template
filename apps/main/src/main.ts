import { createApp } from 'vue'
import '@yy-admin/common-css'

import { Layout, setupAdmin } from '@yy-admin/components-admin'
import { monitorPageList } from '@yy-admin/web-monitor'
import { systemHomePage, systemPageList, testPageList } from '@yy-admin/web-system'
import App from './App.vue'

const app = createApp(App)

setupAdmin(app, { ...monitorPageList(), ...systemPageList(), ...testPageList() }, {
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
      component: systemHomePage,
    },
  ],
})

app.mount('#root')
