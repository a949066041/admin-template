export interface MenuList {
  id?: number
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
  pid?: string
}

interface Meta {
  icon: string
  noCache: boolean
  title: string
}
