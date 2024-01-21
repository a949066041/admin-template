import { addModulePageList } from '@yy-admin/components-admin'

// @ts-expect-error
export const systemPageList = () => addModulePageList(import.meta.glob('./views/**/*.vue'), 'system')
export function testPageList() {
  return {
    // @ts-expect-error
    'generator/config': () => import('./views/generator/config.vue'),
  }
}

export const systemHomePage = () => import('./views/home-page.vue')
