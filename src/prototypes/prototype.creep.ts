declare global {
  interface Creep {
    harvestOrMove(source: Source): void
    repairOrMove(struct: Structure): void
    buildOrMove(struct: ConstructionSite): void
    upgradeOrMove(struct: StructureController): void
    transferOrMove(struct: Structure, resource: ResourceConstant): void
  }
}

function moveAndDrawPath(bot: Creep, target: RoomPosition, lineColor: string): void {
  bot.moveTo(target, {
    reusePath: 5,
    visualizePathStyle: {
      stroke: lineColor,
      strokeWidth: 0.07,
      opacity: 0.5,
      lineStyle: 'dotted'
    }
  })
}

Creep.prototype.harvestOrMove = function (source: Source) {
  if (this.harvest(source) === ERR_NOT_IN_RANGE) {
    moveAndDrawPath(this, source.pos, '#ffeb3b')
  }
}

Creep.prototype.repairOrMove = function (struct: Structure) {
  if (this.repair(struct) === ERR_NOT_IN_RANGE) {
    moveAndDrawPath(this, struct.pos, '#76ff03')
  }
}

Creep.prototype.buildOrMove = function (struct: ConstructionSite) {
  if (this.build(struct) === ERR_NOT_IN_RANGE) {
    moveAndDrawPath(this, struct.pos, '#0288d1')
  }
}

Creep.prototype.upgradeOrMove = function (controller: StructureController) {
  if (this.upgradeController(controller) === ERR_NOT_IN_RANGE) {
    moveAndDrawPath(this, controller.pos, '#ff1744')
  }
}

Creep.prototype.transferOrMove = function (struct: Structure, resource: ResourceConstant) {
  if (this.transfer(struct, resource) === ERR_NOT_IN_RANGE) {
    moveAndDrawPath(this, struct.pos, '#9c27b0')
  }
}

export {}
