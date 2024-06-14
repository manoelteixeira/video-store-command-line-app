// src/user.js
const { nanoid } = require("nanoid");

function newUser(name, address, phone, username, password, isEmploy) {
  if (!name || typeof name != "string") {
    throw "Invalid Name";
  }
  if (!address || typeof address != "string") {
    throw "Invalid Address";
  }
  if (!phone || typeof phone != "string") {
    throw "Invalid Phone Number";
  }
  if (!username || typeof username != "string") {
    throw "Invalid Username";
  }
  if (!password || typeof password != "string") {
    throw "Invalid Password";
  }
  if (typeof isEmploy != "boolean") {
    throw "isEmploy should be a boolean value";
  }
  return {
    id: nanoid(10),
    name,
    address,
    phone,
    username,
    password,
    isEmploy,
  };
}

module.exports = newUser;
