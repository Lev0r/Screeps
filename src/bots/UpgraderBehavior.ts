import { IBehavior } from './IBehavior'
import { MapHelper } from 'helpers/MapHelper'

export class UpgraderBehavior implements IBehavior {
  public canDoJob(bot: Creep): boolean {
    return bot.room.controller !== undefined
  }

  public doJob(bot: Creep): void {
    if (bot.memory.working && bot.store[RESOURCE_ENERGY] === 0) {
      bot.memory.working = false
      bot.say('🔄 harvest')
    }

    if (!bot.memory.working && bot.store.getFreeCapacity() === 0) {
      bot.memory.working = true
      bot.say('⚡ upgrade')
    }

    if (bot.memory.working) {
      const target = bot.room.controller
      if (target) {
        bot.upgradeOrMove(target)
      }
    } else {
      const source = MapHelper.Sources[0]
      bot.harvestOrMove(source)
    }
  }
}
