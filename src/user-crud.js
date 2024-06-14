// src/user-crud.js
const newUser = require("./user");
const {
  getDataByID,
  getDataIndex,
  createDataTable,
} = require("./helpers/dataHelpers");
const { logInfo, logSucess, logError, print } = require("./helpers/loggers");

const userParams = [
  "name",
  "address",
  "phone",
  "username",
  "password",
  "isEmploy",
];

/**
 * Create a new user
 * @param {Object} data - Application data
 * @param {Object} args
 * @returns
 */
function createUser(data, args, log = true) {
  // Validate Args
  const userParamsStr = userParams.sort().join(" ");
  const argsStr = Object.keys(args).sort().join(" ");
  if (userParamsStr != argsStr) {
    throw logError(
      `Missing Parameters!\nParameters expected: ${logInfo(userParamsStr)}`
    );
  }
  const name = args.name;
  const address = args.address;
  const phone = args.phone;
  const username = args.username;
  const password = args.password;
  const isEmploy =
    args.isEmploy == "true" ? true : args.isEmploy == "false" ? false : "";
  if (data.users.find((user) => user.username == username)) {
    throw logError("Username already exist");
  }
  try {
    const user = newUser(name, address, phone, username, password, isEmploy);
    data.users.push(user);
    if (log) {
      print(`${logSucess("Neu User Created.")}\n\n${createDataTable(user)}`);
    }
    return data;
  } catch (err) {
    print(logError(err));
  }
}

/**
 * Show specific user data
 * @param {*} data
 * @param {*} args
 */
function readUser(data, args) {
  const { id } = args;
  if (!id) {
    throw logError("Missing User ID");
  }
  const user = getDataByID(data.users, id);
  if (!user) {
    throw logError("User Not Found");
  } else {
    print(createDataTable(user));
  }
}

/**
 * Update User
 * @param {*} data
 * @param {*} args
 * @returns
 */
function updateUser(data, args, log = true) {
  const { id } = args;
  if (!id) {
    throw logError("Missing User ID");
  }
  const userIdx = getDataIndex(data.users, id);
  if (userIdx == -1) {
    throw logError("User Not Found");
  } else {
    const argKeys = Object.keys(args);
    for (const key of argKeys) {
      if (key != "id" && userParams.includes(key)) {
        if (key == "username") {
          const usernames = data.users.map((user) => user.username);
          if (usernames.includes(args.username)) {
            throw logError("Username already taken.");
          }
          data.users[userIdx].username = args.username;
        } else {
          data.users[userIdx][key] = args[key];
        }
      }
    }
    if (log) {
      print(createDataTable(data.users[userIdx]));
    }
    return data;
  }
}

/**
 * Delete User
 * @param {*} data
 * @param {*} args
 * @returns
 */
function deleteUser(data, args, log = true) {
  const { id } = args;
  if (!id) {
    throw logError("Missing User ID");
  }
  const user = getDataByID(data.users, id);
  if (!user) {
    throw logError("User Not Found");
  }

  const userIdx = getDataIndex(data.users, id);
  data.users.splice(userIdx, 1);
  if (log) {
    print(createDataTable(user));
  }
  return data;
}

module.exports = { createUser, readUser, updateUser, deleteUser };
