import { onMounted, ref } from 'vue'
import { DeptApi } from '@yy-admin/common-apis'
import type { TreeProps, TreeSelectProps } from 'ant-design-vue'

export function useTreeDept() {
  const selectedDeps = ref<string[]>([])
  const userDeptTree = ref<TreeProps['treeData']>([])
  const userFormDeptTree = ref<TreeSelectProps['treeData']>([])

  const handleGetLeftTree: TreeProps['loadData'] = (treeNode) => {
    return new Promise<void>((resolve) => {
      if (treeNode.dataRef!.children) {
        resolve()
        return
      }
      handleGetTree(treeNode.key as number).then((res) => {
        treeNode.dataRef!.children = res
        userDeptTree.value = [...userDeptTree.value as any]
        resolve()
      })
    })
  }

  // const onLoadData = (treeNode: TreeSelectProps['treeData'][number]) => {
  //   return new Promise(resolve => {
  //     const { id } = treeNode.dataRef;
  //     setTimeout(() => {
  //       userFormDeptTree.value = userFormDeptTree.value.concat([
  //       ]);
  //       resolve(true);
  //     }, 300);
  //   });
  // }

  async function handleGetTree(pid?: number) {
    const deptTree = await DeptApi.getDeptTree(pid)
    return deptTree.content.map(item => ({ key: item.id, title: item.label, isLeaf: !item.hasChildren }))
  }

  onMounted(() => {
    handleGetTree().then((res) => {
      userDeptTree.value = res
    })
  })

  return {
    userFormDeptTree,
    selectedDeps,
    userDeptTree,
    handleGetLeftTree,
  }
}
