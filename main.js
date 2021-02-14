var spawner = require("struct.spawner");
var creepWorker = require("creep.worker");
var { intAdditionalMemorySegments } = require("memoryHelper");
require("prototype.creep")();
require("prototype.room")();
require("prototype.structure")();

intAdditionalMemorySegments();

module.exports.loop = function () {
  spawner.spawn(Game.spawns.Spawn1);

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    creepWorker.doJob(creep);
  }
};
