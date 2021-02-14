module.exports = {
  run: function (creep) {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.upgrading = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
      creep.memory.upgrading = true;
      creep.say("⚡ upgrade");
    }

    if (creep.memory.upgrading) {
      creep.upgradeOrMove(creep.room.controller);
    } else {
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      creep.harvestOrMove(source);
    }

    return true;
  },
};
