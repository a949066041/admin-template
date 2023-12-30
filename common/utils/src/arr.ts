interface IRecursiveLeafArrOptions {
  key: string
  value: string
  keyValue: string
  valueValue: string
}

export function recursiveLeafArr<T extends { children?: T[], leaf: boolean, isLeaf: boolean, [key: string]: any }>(arr: T[], options?: IRecursiveLeafArrOptions): T[] {
  options = {
    key: 'id',
    value: 'name',
    keyValue: 'id',
    valueValue: 'label',
    ...options,
  }
  return arr.map((item) => {
    const init = {
      [options!.key]: item[options!.keyValue],
      [options!.value]: item[options!.valueValue],
    }
    if (item.children && item.children.length > 0) {
      return {
        ...item,
        ...init,
        isLeaf: item.leaf,
        children: recursiveLeafArr(item.children, options),
      }
    }
    return {
      ...item,
      ...init,
      isLeaf: item.leaf,
    }
  })
}
