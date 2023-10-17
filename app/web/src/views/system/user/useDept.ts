import { ref } from 'vue'
import { DeptApi, type IDept } from '@yy-admin/apis'

export function useDept() {
  const selectedDeps = ref<string[]>([])
  const deptTree = ref<IDept[]>([])
  const deptAllTree = ref<IDept[]>([])
  const fieldNames = { title: 'label', key: 'id', value: 'id' }

  function handleGetDeptTree(treeNode: { dataRef: IDept }) {
    return new Promise<void>((resolve) => {
      if (treeNode.dataRef.children) {
        resolve()
        return
      }
      DeptApi.getDeptTree(treeNode.dataRef.id).then((res) => {
        treeNode.dataRef.children = res.content
        deptTree.value = [...deptTree.value]
        deptAllTree.value = [...deptAllTree.value]
        resolve()
      })
    })
  }

  function handleGetSuperior(depId?: number) {
    if (!depId) {
      DeptApi.getDeptTree().then((res) => {
        deptAllTree.value = res.content
      })
      return
    }
    DeptApi.superior(depId).then((res) => {
      deptAllTree.value = res.content
    })
  }

  DeptApi.getDeptTree().then((res) => {
    deptTree.value = res.content
  })

  return {
    deptAllTree,
    fieldNames,
    selectedDeps,
    deptTree,
    handleGetSuperior,
    handleGetDeptTree,
  }
}
