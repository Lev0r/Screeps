var harvestBehavior = require("behavior.miner");
var upgradeBehavior = require("behavior.upgrader");
var builderBehavior = require("behavior.builder");
var repairerBehavior = require("behavior.repairer");
var c = require("c");

function canDoJob(creep, jobName) {
  if (jobName == c.jobs.mine) {
    return harvestBehavior.run(creep);
  } else if (jobName == c.jobs.build) {
    return builderBehavior.run(creep);
  } else if (jobName == c.jobs.repair) {
    return repairerBehavior.run(creep);
  } else if (jobName == c.jobs.upgrade) {
    return upgradeBehavior.run(creep);
  } else {
    return false;
  }
}

function displayJobIcon(creep, jobName) {
  if (jobName == c.jobs.mine) {
    creep.say("⛏️");
  } else if (jobName == c.jobs.build) {
    creep.say("⚒️");
  } else if (jobName == c.jobs.repair) {
    creep.say("🔧");
  } else if (jobName == c.jobs.upgrade) {
    creep.say("🔱");
  }
}

module.exports = {
  doJob: function (targetCreep) {
    for (let jobName of targetCreep.memory.jobs) {
      let result = canDoJob(targetCreep, jobName);
      if (result) {
        displayJobIcon(targetCreep, jobName);
        return;
      }
    }
  },
};
