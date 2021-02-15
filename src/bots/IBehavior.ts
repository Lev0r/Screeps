export interface IBehavior {
  doJob(bot: Creep): void
  canDoJob(bot: Creep): boolean
}
