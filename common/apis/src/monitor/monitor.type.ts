export interface IMonitorInfo {
  sys: Sys
  cpu: Cpu
  memory: Memory
  swap: Swap
  disk: Memory
  time: string
}

interface Swap {
  total: string
  used: string
  available: string
  usageRate: string
}

interface Memory {
  total: string
  available: string
  used: string
  usageRate: string
}

interface Cpu {
  name: string
  package: string
  core: string
  coreNumber: number
  logic: string
  used: string
  idle: string
}

interface Sys {
  os: string
  day: string
  ip: string
}
