module.exports = function () {
  Creep.prototype.harvestOrMove = function (source) {
    if (this.harvest(source) == ERR_NOT_IN_RANGE) {
      this.moveTo(source, {
        reusePath: 5,
        visualizePathStyle: {
          stroke: "#ffeb3b",
          strokeWidth: 0.07,
          opacity: 0.5,
          lineStyle: "dotted",
        },
      });
    }
  };

  Creep.prototype.repairOrMove = function (struct) {
    if (this.repair(struct) == ERR_NOT_IN_RANGE) {
      this.moveTo(struct, {
        reusePath: 5,
        visualizePathStyle: {
          stroke: "#76ff03",
          strokeWidth: 0.07,
          opacity: 0.5,
          lineStyle: "dotted",
        },
      });
    }
  };

  Creep.prototype.buildOrMove = function (struct) {
    if (this.build(struct) == ERR_NOT_IN_RANGE) {
      this.moveTo(struct, {
        reusePath: 5,
        visualizePathStyle: {
          stroke: "#0288d1",
          strokeWidth: 0.07,
          opacity: 0.5,
          lineStyle: "dotted",
        },
      });
    }
  };

  Creep.prototype.upgradeOrMove = function (controller) {
    if (this.upgradeController(controller) == ERR_NOT_IN_RANGE) {
      this.moveTo(controller, {
        reusePath: 5,
        visualizePathStyle: {
          stroke: "#ff1744",
          strokeWidth: 0.07,
          opacity: 0.5,
          lineStyle: "dotted",
        },
      });
    }
  };

  Creep.prototype.transferOrMove = function (struct, resource) {
    if (this.transfer(struct, resource) == ERR_NOT_IN_RANGE) {
      this.moveTo(struct, {
        reusePath: 5,
        visualizePathStyle: {
          stroke: "#9c27b0",
          strokeWidth: 0.07,
          opacity: 0.5,
          lineStyle: "dotted",
        },
      });
    }
  };
};
