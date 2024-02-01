import { CookieStore } from '@yy-admin/common-utils'
import { describe, expect, it } from 'vitest'

describe('cookie', () => {
  const userToken = new CookieStore('token', 'init value')
  it('get default', () => {
    expect(userToken.getValue()).toEqual('init value')
  })

  it('set token', () => {
    userToken.setValue('123456')
    expect(userToken.getValue()).toEqual('123456')
  })

  it('get token', () => {
    expect(userToken.getValue()).toEqual('123456')
  })

  it('get error token', () => {
    expect(userToken.getValue()).not.toEqual('1234567')
  })

  it('remove token', () => {
    userToken.removeValue()
    expect(userToken.getValue()).toEqual('init value')
  })
})
