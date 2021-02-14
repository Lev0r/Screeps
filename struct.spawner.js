const c = require("c");
const { cleanCreepMemory } = require("memoryHelper");

const targetCreeps = {
  builder: 3,
  miner: 5,
  upgrader: 4,
  repairer: 1,
};

const roles = {
  miner: [c.jobs.mine, c.jobs.repair, c.jobs.build, c.jobs.upgrade],
  builder: [c.jobs.build, c.jobs.repair, c.jobs.mine, c.jobs.upgrade],
  upgrader: [c.jobs.upgrade, c.jobs.mine, c.jobs.repair, c.jobs.build],
  repairer: [c.jobs.repair, c.jobs.mine, c.jobs.build, c.jobs.upgrade],
};

module.exports = {
  spawn: function (spawn) {
    var requireCreeps = {
      ...targetCreeps,
    };

    for (var cr in Game.creeps) {
      let creepMainJob = Game.creeps[cr].memory.jobs[0];
      if (creepMainJob == c.jobs.mine) {
        requireCreeps.miner--;
        continue;
      }
      if (creepMainJob == c.jobs.build) {
        requireCreeps.builder--;
        continue;
      }
      if (creepMainJob == c.jobs.upgrade) {
        requireCreeps.upgrader--;
        continue;
      }
      if (creepMainJob == c.jobs.repair) {
        requireCreeps.repairer--;
      }
    }

    for (var r in requireCreeps) {
      if (requireCreeps[r] > 0) {
        var newName = r + Game.time;
        spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {
          memory: { jobs: roles[r] },
        });
        cleanCreepMemory();
      }
    }

    // Display message
    if (spawn.spawning) {
      var spawningCreep = Game.creeps[spawn.spawning.name];
      spawn.room.visual.text(
        "Spawning " + spawningCreep.memory.jobs[0] + "er",
        spawn.pos.x + 1,
        spawn.pos.y,
        { align: "left", opacity: 0.8 }
      );
    }
  },
};
