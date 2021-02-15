import { IBehavior } from './IBehavior'
import { MapHelper } from 'helpers/MapHelper'

export class BuilderBehavior implements IBehavior {
  public canDoJob(bot: Creep): boolean {
    return MapHelper.ConstructionSites.length > 0
  }

  public doJob(bot: Creep): void {
    if (bot.memory.working && bot.store[RESOURCE_ENERGY] === 0) {
      bot.memory.working = false
      bot.say('🔄 harvest')
    }

    if (!bot.memory.working && bot.store.getCapacity() === 0) {
      bot.memory.working = true
      bot.say('🚧 build')
    }

    if (bot.memory.working) {
      if (MapHelper.ConstructionSites.length > 0) {
        const target = MapHelper.ConstructionSites[0]
        bot.room.visual.text('🚧', target.pos)

        bot.buildOrMove(target)
      }
    } else {
      bot.harvestOrMove(MapHelper.Sources[0])
    }
  }
}
