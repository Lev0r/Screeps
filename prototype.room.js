module.exports = function () {
  Room.prototype.getSources = function () {
    return this.find(FIND_SOURCES);
  };
};
