import { DeptApi, type IDeptTreeRecord } from '@yy-admin/common-apis'

function withDeptTree(tree: IDeptTreeRecord[]) {
  return tree.map(item => ({ ...item, name: item.label, isLeaf: item.leaf, children: item.children }))
}

export function useDeptTree() {
  const deptTreeData = ref<IDeptTreeRecord[]>([])
  function handleLazyDept(node: IDeptTreeRecord) {
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

  return {
    deptTreeData,
    triggerDeptTree,
    handleLazyDept,
  }
}
