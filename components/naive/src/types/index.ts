import type { FormItemRule } from 'naive-ui'

export type NaiveFormRules<T extends Record<string, any>> = Partial<Record<keyof T, FormItemRule | FormItemRule[]>>
