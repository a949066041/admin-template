import { addModulePageList } from '@yy-admin/components-admin'

// @ts-expect-error
export const systemPageList = () => addModulePageList(import.meta.glob('./views/**/*.vue'), 'system')

export const systemHomePage = () => import('./views/home-page.vue')
