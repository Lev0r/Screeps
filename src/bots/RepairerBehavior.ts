import { IBehavior } from './IBehavior'
import { MapHelper } from 'helpers/MapHelper'

export class RepairerBehavior implements IBehavior {
  public canDoJob(bot: Creep): boolean {
    return MapHelper.StructuresToRepair.length > 0
  }

  public doJob(bot: Creep): void {
    if (bot.memory.working && bot.store[RESOURCE_ENERGY] === 0) {
      bot.memory.working = false
      bot.say('🔄 harvest')
    }

    if (!bot.memory.working && bot.store.getFreeCapacity() === 0) {
      bot.memory.working = true
      bot.say('🛠️ repair')
    }

    if (bot.memory.working) {
      if (MapHelper.StructuresToRepair.length > 0) {
        const target = MapHelper.StructuresToRepair[0]
        bot.room.visual.text('🔧', target.pos)

        bot.repairOrMove(target)
      }
    } else {
      bot.harvestOrMove(MapHelper.Sources[0])
    }
  }
}
