import type { Rule } from 'vexip-ui'
import type { FormItemRule } from 'naive-ui'

export type VexipFormRules<T extends Record<string, any>> = Partial<Record<keyof T, Rule>>
export type NaiveFormRules<T extends Record<string, any>> = Partial<Record<keyof T, FormItemRule | FormItemRule[]>>
