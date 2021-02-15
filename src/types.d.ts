// example declaration file - remove these and add your own custom typings

import { Job } from 'bots/Jobs'

// memory extension samples
declare global {
  interface CreepMemory {
    jobs: Job[]
    working: boolean
  }
}

export {}
