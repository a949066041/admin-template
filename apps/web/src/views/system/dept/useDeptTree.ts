import { DeptApi, type IDeptTreeRecord } from '@yy-admin/common-apis'

function withDeptTree(tree: IDeptTreeRecord[]) {
  return tree.map(item => ({ ...item, name: item.label, isLeaf: item.leaf, children: item.children }))
}

export function useDeptTree(init = false) {
  const deptTreeData = ref<IDeptTreeRecord[]>([])
  const filterInput = ref<string>('')
  function handleLazyDept(node: IDeptTreeRecord & any) {
    return new Promise<void>((resolve) => {
      DeptApi.getDeptTree({ pid: node.id! }).then((res) => {
        node.children = withDeptTree(res.content)
        resolve()
      })
    })
  }

  function triggerDeptTree(isAdd: boolean, pid?: number | null) {
    if (isAdd || !pid) {
      DeptApi.getDeptTree({}).then((res) => {
        deptTreeData.value = withDeptTree(res.content)
      })
      return
    }
    DeptApi.superior(pid!).then((res) => {
      deptTreeData.value = withDeptTree(res.content)
    })
  }

  watch(filterInput, async (val) => {
    const res = await DeptApi.getDeptTree(val ? { name: val } : {})
    deptTreeData.value = withDeptTree(res.content)
  })

  init && triggerDeptTree(true)

  return {
    filterInput,
    deptTreeData,
    triggerDeptTree,
    handleLazyDept,
  }
}
