import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import { applyPlugins } from '@ruabick/md-demo-plugins'
import unocss from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@yy-admin/template',
  description: '文档简介',
  markdown: {
    config: (md) => {
      applyPlugins(md)
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
  vite: {
    plugins: [
      unocss(resolve(__dirname, '../../../unocss.config.ts')),
    ],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/index' },
    ],

    sidebar: [
      {
        text: '组件',
        items: [
          { text: '下拉框', link: '/components/select/index' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
