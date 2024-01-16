import { addModulePageList } from '@yy-admin/components-admin'

// @ts-expect-error
export const monitorPageList = () => addModulePageList(import.meta.glob('./views/**/*.vue'), 'monitor')
