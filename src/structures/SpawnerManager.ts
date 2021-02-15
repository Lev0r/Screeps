import { Job } from '../bots/Jobs'

export type BodyTemplate = BodyPartConstant[]

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

  private bodyCosts: Map<BodyPartConstant, number> = new Map<BodyPartConstant, number>()

  private bodyTemplates: { [name: string]: BodyTemplate } = {
    balanced: [WORK, CARRY, MOVE]
  }

  public constructor() {
    this.bodyCosts.set(MOVE, 50)
    this.bodyCosts.set(WORK, 100)
    this.bodyCosts.set(CARRY, 50)
    this.bodyCosts.set(ATTACK, 80)
    this.bodyCosts.set(RANGED_ATTACK, 150)
    this.bodyCosts.set(HEAL, 250)
    this.bodyCosts.set(CLAIM, 600)
    this.bodyCosts.set(TOUGH, 10)
  }

  private getTemplateCost(template: BodyTemplate) {
    let cost = 0
    for (const part of template) {
      cost += this.bodyCosts.get(part) ?? 0
    }
    return cost
  }

  public SpawnBotIfNeeded(template: BodyTemplate): void {
    if (!this.Spawner) {
      return
    }

    const requireBots = { ...this.targetBots }

    for (const botName in Game.creeps) {
      const mainJob = Game.creeps[botName].memory.jobs[0]
      requireBots[mainJob]--
    }

    const howManyTemplates = Math.floor(this.Spawner.room.energyAvailable / this.getTemplateCost(template))
    let body: BodyTemplate = []
    for (let i = 0; i < howManyTemplates; i++) {
      body = body.concat(template)
    }

    for (const r in requireBots) {
      if (requireBots[r] > 0) {
        const newName = r + Game.time.toString()
        this.Spawner?.spawnCreep(body, newName, {
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
