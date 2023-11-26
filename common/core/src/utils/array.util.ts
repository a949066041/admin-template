export function flatChildrenArr(children: any[]) {
  return children.reduce((acc, child) => {
    if (child.children)
      acc.push(...flatChildrenArr(child.children))

    else
      acc.push(child)

    return acc
  }, [])
}

export function getParents<T extends any[]>(arr: T, key: string): string[] {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].key === key)
      return [arr[i].key]

    if (arr[i].children) {
      const parent = getParents(arr[i].children, key)
      if (parent.length > 0)
        return [arr[i].key, ...parent]
    }
  }
  return []
}
