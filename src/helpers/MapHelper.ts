export class MapHelper {
  public static ConstructionSites: ConstructionSite[]
  public static Structures: AnyStructure[]
  public static Sources: Source[]

  public static ScanRoom(room: Room): void {
    const structures = room.find(FIND_STRUCTURES)
    this.Structures = structures

    const sources = room.find(FIND_SOURCES)
    this.Sources = sources

    const cSites = room.find(FIND_CONSTRUCTION_SITES)
    this.ConstructionSites = cSites
  }

  public static get EnergyConsumers(): AnyStructure[] {
    return this.Structures.filter(
      s =>
        (s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_SPAWN) &&
        s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    )
  }

  public static get StructuresToRepair(): AnyStructure[] {
    return this.Structures.filter(s => s.structureType !== STRUCTURE_WALL && s.hits / s.hitsMax < 0.9)
  }
}
