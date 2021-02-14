const memHelper = require("memoryHelper");
const { getStructMem } = require("./memoryHelper");

module.exports = function () {
  Object.defineProperty(Structure.prototype, "memory", {
    get: function () {
      return getStructMem(this);
    },
    enumerable: false,
    configurable: true,
  });

  Structure.prototype.clearMemory = function () {
    delete Memory.structures[this.id];
  };
};
