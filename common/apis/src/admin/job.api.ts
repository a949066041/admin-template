import { ApiInstance } from '../instance'
import type { IJobEntity } from './job.type'

class JobApiInstance extends ApiInstance<IJobEntity> {
  baseApi = '/api/job'
}

export const JobApi = new JobApiInstance()
