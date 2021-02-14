function setTarget(creep, struct) {
  if (memHelper.getStructMem(struct).buildingBy) {
    memHelper.getStructMem(struct).buildingBy.push(creep.id);
  } else {
    memHelper.getStructMem(struct).buildingBy = [creep.id];
  }
  console.log(
    "set new building target: " + JSON.stringify(memHelper.getStructMem(struct))
  );
  creep.memory.repairingTarget = struct.id;
}

function clearTarget(creep) {
  let struct = Game.getObjectById(creep.memory.repairingTarget);
  if (struct) {
    memHelper.getStructMem(struct).buildingBy = undefined;
  }
  creep.memory.repairingTarget = undefined;
}

function checkCanContinueRepairTarget(creep) {
  let struct = Game.getObjectById(creep.memory.repairingTarget);
  if (struct.hits < struct.hitsMax) {
    return struct;
  } else return null;
}

function getTargets(creep) {
  return creep.room.find(FIND_CONSTRUCTION_SITES);
}

module.exports = {
  run: function (creep) {
    var targets = getTargets(creep);
    if (targets.length <= 0) {
      return false;
    }

    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say("🚧 build");
    }

    if (creep.memory.building) {
      if (targets.length) {
        let target = targets[0];

        // Draw building icon on object
        creep.room.visual.text("🚧", target.pos.x, target.pos.y, target.pos, {
          align: "center",
          font: 0.3,
        });

        creep.buildOrMove(target);
      }
    } else {
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      creep.harvestOrMove(source);
    }

    return true;
  },
};
