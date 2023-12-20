import { isValidPhone } from '@yy-admin/common-utils'
import { expect, it } from 'vitest'

it('validate phone', () => {
  expect(isValidPhone('13800138000')).toBe(true)
  expect(isValidPhone('138001380001')).toBe(false)
})
