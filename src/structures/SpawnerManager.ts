import { Job } from '../bots/Jobs'

export class SpawnerManager {
  private spawner: StructureSpawn | undefined
  public get Spawner(): StructureSpawn | undefined {
    if (this.spawner) {
      return this.spawner
    }
    for (const spawn in Game.spawns) {
      this.spawner = Game.spawns[spawn]
      return this.spawner
    }
    return undefined
  }

  private JobTemplates: { [name: string]: Job[] } = {
    mine: ['mine', 'build', 'repair', 'upgrade'],
    build: ['build', 'repair', 'mine', 'upgrade'],
    repair: ['repair', 'mine', 'build', 'upgrade'],
    upgrade: ['upgrade', 'repair', 'mine']
  }

  private targetBots: { [name: string]: number } = {
    mine: 5,
    build: 3,
    upgrade: 4,
    repair: 1
  }

  public SpawnBotIfNeeded(): void {
    const requireBots = { ...this.targetBots }

    for (const botName in Game.creeps) {
      const mainJob = Game.creeps[botName].memory.jobs[0]
      requireBots[mainJob]--
    }

    for (const r in requireBots) {
      if (requireBots[r] > 0) {
        const newName = r + Game.time.toString()
        this.Spawner?.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {
          memory: {
            working: false,
            jobs: this.JobTemplates[r]
          }
        })
      }
    }

    // Display message
    if (this.Spawner?.spawning) {
      const spawningCreep = Game.creeps[this.Spawner.spawning.name]
      this.Spawner.room.visual.text(
        'Spawning ' + spawningCreep.memory.jobs[0] + 'er',
        this.Spawner.pos.x + 1,
        this.Spawner.pos.y,
        {
          align: 'left',
          opacity: 0.8
        }
      )
    }
  }
}
