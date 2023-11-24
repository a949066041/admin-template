import type { Rule } from 'ant-design-vue/es/form'

export type AntdFormRules<T extends Record<string, any>> = Partial<Record<keyof T, Rule[] | Rule>>
