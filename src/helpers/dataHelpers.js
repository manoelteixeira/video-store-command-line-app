const Table = require("cli-table");
const { logInfo, logSucess, logError, print } = require("./loggers");
const { ne } = require("@faker-js/faker");

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

function createUsersTable(users) {
  const usersTable = new Table({
    head: [
      logError("ID"),
      logInfo("Name"),
      logInfo("Address"),
      logInfo("Phone"),
      logInfo("Username"),
      logInfo("Password"),
      logInfo("Is Employ"),
    ],
  });
  for (user of users) {
    let { id, name, address, phone, username, password, isEmploy } = user;
    id = logError(id);
    isEmploy = isEmploy ? logSucess("Yes") : logError("No");
    password = logError("*".repeat(password.length));
    usersTable.push([id, name, address, phone, username, password, isEmploy]);
  }
  return usersTable.toString();
}

function createMoviesTable(movies) {
  const moviesTable = new Table({
    head: [
      logError("ID"),
      logInfo("Title"),
      logInfo("Director"),
      logInfo("Genre"),
      logInfo("Year"),
      logInfo("Quantity"),
      logInfo("Price"),
    ],
  });
  for (movie of movies) {
    let { id, title, director, genre, year, quantity, priceInCents } = movie;
    id = logError(id);
    quantity =
      quantity == 0 ? logError(`${quantity}`) : logSucess(`${quantity}`);
    let price = `$${priceInCents / 100}`;
    moviesTable.push([id, title, director, genre, year, quantity, price]);
  }
  return moviesTable.toString();
}

module.exports = {
  getDataByID,
  getDataIndex,
  createDataTable,
  createUsersTable,
  createMoviesTable,
};
