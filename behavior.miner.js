function getTargets(creep) {
  return creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (
        (structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN) &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      );
    },
  });
}

module.exports = {
  run: function (creep) {
    var targets = getTargets(creep);
    if (targets.length <= 0) {
      return false;
    }

    if (creep.store.getFreeCapacity() > 0) {
      var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      creep.harvestOrMove(source);
    } else {
      creep.transferOrMove(targets[0], RESOURCE_ENERGY);
    }

    return true;
  },
};
