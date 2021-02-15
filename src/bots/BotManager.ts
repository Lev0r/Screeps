import { BuilderBehavior } from './BuilderBehavior'
import { IBehavior } from './IBehavior'
import { Job } from './Jobs'
import { MinerBehavior } from './MinerBehavior'
import { RepairerBehavior } from './RepairerBehavior'
import { UpgraderBehavior } from './UpgraderBehavior'

export class BotManager {
  private Behaviors: Map<Job, IBehavior> = new Map<Job, IBehavior>()

  public constructor() {
    this.Behaviors.set('build', new BuilderBehavior())
    this.Behaviors.set('mine', new MinerBehavior())
    this.Behaviors.set('repair', new RepairerBehavior())
    this.Behaviors.set('upgrade', new UpgraderBehavior())
  }

  private displayJobIcon(bot: Creep, job: Job) {
    if (job === 'mine') {
      bot.say('⛏️')
    } else if (job === 'build') {
      bot.say('⚒️')
    } else if (job === 'repair') {
      bot.say('🔧')
    } else if (job === 'upgrade') {
      bot.say('🔱')
    }
  }

  public doJob(bot: Creep): void {
    for (const job of bot.memory.jobs) {
      const b = this.Behaviors.get(job)
      if (b && b.canDoJob(bot)) {
        b.doJob(bot)
        this.displayJobIcon(bot, job)
        return
      }
    }
  }
}
