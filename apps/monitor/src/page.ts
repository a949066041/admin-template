import { addModulePageList } from '@yy-admin/components-admin'

// @ts-ignore
export const monitorPageList = () => addModulePageList(import.meta.glob('./views/**/*.vue'), 'monitor')
