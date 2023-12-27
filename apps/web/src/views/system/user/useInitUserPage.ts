import type { IJobEntity, IRoleEntity } from '@yy-admin/common-apis'
import { JobApi, RoleApi } from '@yy-admin/common-apis'

export function useInitUserPage() {
  const jobList = ref<IJobEntity[]>([])
  const selectedDeps = ref<number[]>([])
  const roleList = ref<IRoleEntity[]>([])

  JobApi.page({ page: 0, size: 999, enabled: true }).then((res) => {
    jobList.value = res.content
  })

  RoleApi.all().then((res) => {
    roleList.value = res
  })

  return {
    selectedDeps,
    jobList,
    roleList,
  }
}
