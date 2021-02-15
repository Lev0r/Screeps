import { IBehavior } from './IBehavior'
import { MapHelper } from 'helpers/MapHelper'

export class MinerBehavior implements IBehavior {
  public doJob(bot: Creep): void {
    if (bot.store.getFreeCapacity() > 0) {
      bot.harvestOrMove(MapHelper.Sources[0])
    } else {
      bot.transferOrMove(MapHelper.EnergyConsumers[0], RESOURCE_ENERGY)
    }
  }
  public canDoJob(bot: Creep): boolean {
    return MapHelper.EnergyConsumers.length > 0
  }
}
