import { CookieStore } from '@yy-admin/common-utils'

/** 用户token */
export const tokenStorage = new CookieStore<string>('token', '')
