import type { IJobEntity } from './job.type'
import { ApiInstance } from '../instance'

class JobApiInstance extends ApiInstance<IJobEntity> {
  baseApi = '/api/job'
}

export const JobApi = new JobApiInstance()
