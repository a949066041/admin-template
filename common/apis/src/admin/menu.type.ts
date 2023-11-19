export interface MenuList {
  id?: string
  key?: string
  label?: string
  title?: string
  children?: MenuList[]
  component: any
  hasChildren?: boolean
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
