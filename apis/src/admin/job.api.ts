import { ApiInstance } from '../instance'
import type { IJob } from './job.type'

class JobApiInstance extends ApiInstance<IJob> {
  baseApi = '/api/job'
}

export const JobApi = new JobApiInstance()
