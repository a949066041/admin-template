import type { Rule } from 'vexip-ui'

export type VexipFormRules<T extends Record<string, any>> = Partial<Record<keyof T, Rule>>
