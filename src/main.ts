import * as pr from 'prototypes/prototype.creep'
import { BodyTemplate, SpawnerManager } from 'structures/SpawnerManager'
import { BotManager } from 'bots/BotManager'
import { ErrorMapper } from 'utils/ErrorMapper'
import { MapHelper } from 'helpers/MapHelper'

pr.apply()
const botManager: BotManager = new BotManager()
const spawnManager: SpawnerManager = new SpawnerManager()

const balancedWorkerTemplate: BodyTemplate = [WORK, CARRY, MOVE]

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  if (spawnManager.Spawner) {
    MapHelper.ScanRoom(spawnManager.Spawner.room)
  }

  spawnManager.SpawnBotIfNeeded(balancedWorkerTemplate)
  for (const botName in Game.creeps) {
    const bot = Game.creeps[botName]
    botManager.doJob(bot)
  }
})
