import { IBehavior } from './IBehavior'
import { MapHelper } from 'helpers/MapHelper'

export class MinerBehavior implements IBehavior {
  public canDoJob(bot: Creep): boolean {
    return MapHelper.EnergyConsumers.length > 0
  }

  public doJob(bot: Creep): void {
    if (bot.memory.working && bot.store[RESOURCE_ENERGY] === 0) {
      bot.memory.working = false
      bot.say('🔄 harvest')
    }

    if (!bot.memory.working && bot.store.getFreeCapacity() === 0) {
      bot.memory.working = true
      bot.say('🏍️ deliver')
    }

    if (bot.memory.working) {
      bot.transferOrMove(MapHelper.EnergyConsumers[0], RESOURCE_ENERGY)
    } else {
      bot.harvestOrMove(MapHelper.Sources[0])
    }
  }
}
