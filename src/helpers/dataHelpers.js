const Table = require("cli-table");
const { logInfo, logSucess, logError, print } = require("./loggers");

/**
 * Return an object with the given ID
 * @param {Array} data
 * @param {String} id
 * @returns {Object}
 */
function getDataByID(data, id) {
  return data.find((user) => user.id == id);
}

/**
 * Return the index of the object for the given ID
 * @param {Array} data
 * @param {String} id
 * @returns {Number}
 */
function getDataIndex(data, id) {
  for (idx in data) {
    if (data[idx].id == id) {
      return idx;
    }
  }
  return -1;
}

/**
 * Create an table containing the keys and values of a given object
 * @param {Object} data
 * @returns {String}
 */
function createDataTable(data) {
  const userTable = new Table({
    head: [logInfo("Key"), logInfo("Value")],
  });
  for (const key in data) {
    userTable.push([logError(key), logSucess(data[key])]);
  }
  return userTable.toString();
}

module.exports = {
  getDataByID,
  getDataIndex,
  createDataTable,
};
