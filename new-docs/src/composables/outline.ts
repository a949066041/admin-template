import { first } from 'lodash-es'

export function getHeaders() {
  const headers = [
    ...document.querySelectorAll('.markdown-body :where(h1,h2,h3,h4,h5,h6)'),
  ]
    .map((el) => {
      const level = Number(el.tagName[1])
      return {
        element: el as HTMLHeadElement,
        title: serializeHeader(el),
        link: `#${el.id}`,
        level,
      }
    })

  return withHeaderToToc(headers)
}

function serializeHeader(h: Element): string {
  let ret = ''
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      if (
        (node as Element).classList.contains('VPBadge')
        || (node as Element).classList.contains('header-anchor')
        || (node as Element).classList.contains('ignore-header')
      ) {
        continue
      }

      ret += node.textContent
    }
    else if (node.nodeType === 3) {
      ret += node.textContent
    }
  }
  return ret.trim()
}

export interface ITreeTocList {
  element: HTMLHeadElement
  title: string
  link: string
  level: number
  children?: ITreeTocList[]
}

function withHeaderToToc(headerList: ITreeTocList[]) {
  if (headerList.length === 0)
    return []

  const { treeList } = headerList.slice(1).reduce((arr, item) => {
    const { level } = item

    if (level <= arr.level)
      arr.treeList.push({ ...item, children: [] })

    if (level > arr.level)
      arr.treeList[arr.treeList.length - 1].children!.push({ ...item, children: [] })

    if (level !== arr.level)
      arr.level = level
    return arr
  }, { treeList: [{ ...first(headerList), children: [] }], level: first(headerList)!.level } as { treeList: ITreeTocList[], level: number })

  return treeList
}
