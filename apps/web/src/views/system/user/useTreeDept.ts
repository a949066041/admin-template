import { onMounted, ref } from 'vue'
import { DeptApi, type IDept } from '@yy-admin/common-apis'
import type { TreeOption, TreeProps } from 'naive-ui'

function withDeptTree(tree: IDept[]) {
  return tree.map(item => ({ id: item.id, name: item.label, isLeaf: item.leaf }))
}

export function useTreeDept() {
  const selectedDeps = ref<string[]>([])
  const userDeptTree = ref<TreeProps['data']>([])
  const userFormDeptTree = ref<TreeProps['data']>([])
  const filterLeftTree = ref('')

  function handleGetLeftTree(node: TreeOption) {
    return new Promise<void>((resolve) => {
      handleGetTree(node.id as number).then((res) => {
        node.children = res
        resolve()
      })
    })
  }

  function handleGetUserFormTreeDept(isAdd: boolean, pid?: number) {
    if (isAdd) {
      DeptApi.getDeptTree({}).then((res) => {
        userFormDeptTree.value = withDeptTree(res.content)
      })
      return
    }
    DeptApi.superior(pid!).then((res) => {
      userFormDeptTree.value = withDeptTree(res.content)
    })
  }

  watchImmediate(filterLeftTree, (val) => {
    handleGetTree(undefined, val).then((res) => {
      userDeptTree.value = res
    })
  })

  async function handleGetTree(pid?: number, val?: string) {
    const params = {
      pid,
    } as {
      pid?: number
      name?: string
    }
    if (val)
      params.name = val

    const deptTree = await DeptApi.getDeptTree(params)
    return withDeptTree(deptTree.content)
  }

  return {
    filterLeftTree,
    handleGetUserFormTreeDept,
    userFormDeptTree,
    selectedDeps,
    userDeptTree,
    handleGetLeftTree,
  }
}
