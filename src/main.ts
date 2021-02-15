import {} from 'prototypes/prototype.creep'
import {} from './types'
import { BotManager } from 'bots/BotManager'
import { ErrorMapper } from 'utils/ErrorMapper'
import { MapHelper } from 'helpers/MapHelper'

const botManager: BotManager = new BotManager()

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`)

  MapHelper.ScanRoom(Game.rooms[0])

  for (const botName in Game.creeps) {
    const bot = Game.creeps[botName]
    botManager.doJob(bot)
  }
})
