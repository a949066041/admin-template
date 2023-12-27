import { resolve } from 'node:path'

function r(p: string) {
  return resolve(__dirname, p)
}

export const alias: Record<string, string> = {
  '@yy-admin/common-utils': r('./common/utils/src'),
}
