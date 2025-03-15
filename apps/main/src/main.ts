import { Layout, setupAdmin } from '@yy-admin/components-admin'
import { monitorPageList } from '@yy-admin/web-monitor'
import { systemHomePage, systemPageList, testPageList } from '@yy-admin/web-system'

import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import '@yy-admin/common-css'

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
