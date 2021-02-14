function setTarget(creep, struct) {
  struct.memory.repairingBy = [creep.id];
  creep.memory.repairingTarget = struct.id;
}

function clearTarget(creep) {
  let struct = Game.getObjectById(creep.memory.repairingTarget);
  console.log("clear stuct memory: " + struct.id);
  if (struct) {
    struct.clearMemory();
  }
  delete creep.memory.repairingTarget;
}

function checkCanContinueRepairTarget(creep) {
  let struct = Game.getObjectById(creep.memory.repairingTarget);
  if (struct.hits < struct.hitsMax) {
    return struct;
  } else return null;
}

function getTargets(creep) {
  if (creep.memory.repairingTarget) {
    let target = checkCanContinueRepairTarget(creep);
    if (target) {
      return [target];
    }
    clearTarget(creep);
  }

  let structuresToRepair = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (
        structure.hits / structure.hitsMax < 0.9 &&
        structure.structureType != STRUCTURE_WALL &&
        !structure.memory.repairingBy
      );
    },
  });
  structuresToRepair.sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);
  return structuresToRepair;
}

module.exports = {
  run: function (creep) {
    var targets = getTargets(creep);
    if (targets.length <= 0) {
      return false;
    }

    if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.repairing = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
      creep.memory.repairing = true;
      creep.say("🛠️ repair");
    }

    if (creep.memory.repairing) {
      if (targets.length) {
        let target = Game.getObjectById(creep.memory.repairingTarget);
        if (!target) {
          setTarget(creep, targets[0]);
          target = targets[0];
        }

        // Draw repair icon on object
        creep.room.visual.text("🔧", target.pos.x, target.pos.y, target.pos, {
          align: "center",
          font: 0.3,
        });

        creep.repairOrMove(target);
      }
    } else {
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      creep.harvestOrMove(source);
    }

    return true;
  },
};
