module.exports = {
  intAdditionalMemorySegments: function () {
    if (Memory.structures == undefined) {
      Memory.structures = {};
    }
    if (Memory.sources == undefined) {
      Memory.sources = {};
    }
  },

  getStructMem: function (struct) {
    if (!Memory.structures[struct.id]) {
      Memory.structures[struct.id] = {};
    }

    return Memory.structures[struct.id];
  },

  getSourceMem: function (source) {
    if (!Memory.sources[source.id]) {
      Memory.sources[sources.id] = {};
    }

    return Memory.sources[sources.id];
  },

  cleanCreepMemory: function () {
    for (let creepName in Memory.creeps) {
      if (!Game.creeps[creepName]) {
        delete Memory.creeps[creepName];
      }
    }
  },
};
