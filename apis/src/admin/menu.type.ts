export interface MenuList {
  key?: string
  label?: string
  title?: string
  children?: MenuList[]
  component: any
  hidden: boolean
  meta: Meta
  name: string
  path: string
}

interface Meta {
  icon: string
  noCache: boolean
  title: string
}
