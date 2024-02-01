import { decrypt, encrypt } from '@yy-admin/common-utils'
import { describe, expect, it } from 'vitest'

describe('rsa', () => {
  it('decrypt to encrypt', () => {
    const name = encrypt('admin')
    expect(decrypt(name)).toEqual('admin')
  })
})
