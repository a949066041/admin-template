import type { IJobEntity, IRole } from '@yy-admin/common-apis'
import { JobApi, RoleApi } from '@yy-admin/common-apis'

export function useInitUserPage() {
  const jobList = ref<IJobEntity[]>([])
  const roleList = ref<IRole[]>([])

  JobApi.page({ page: 0, size: 999, enabled: true }).then((res) => {
    jobList.value = res.content
  })

  RoleApi.all().then((res) => {
    roleList.value = res
  })

  return {
    jobList,
    roleList,
  }
}
