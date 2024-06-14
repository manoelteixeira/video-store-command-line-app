// src/questions.js
const inquirer = require("inquirer");
const { logInfo, logSucess, logError, print } = require("./helpers/loggers");
// const { createUser, readUser, updateUser, deleteUser } = require("./user-crud");
const newUser = require("./user");

function registerUser(data, save) {
  const userName = {
    name: "name",
    message: "Name",
  };
  const userAddress = {
    name: "address",
    message: "Address",
  };
  const userPhone = {
    name: "phone",
    message: "Phone",
  };
  const userUsername = {
    name: "username",
    message: "Username",
    validate(answer) {
      if (!data.users.find((user) => user.username == answer)) {
        return true;
      }
      return "Username already taken";
    },
  };
  const userPassword = {
    name: "password",
    message: "Password",
  };
  const userIsEmploy = {
    type: "list",
    name: "isEmploy",
    message: "User is an employ ?",
    choices: ["Yes", "No"],
  };

  inquirer
    .prompt([
      userName,
      userAddress,
      userPhone,
      userUsername,
      userPassword,
      userIsEmploy,
    ])
    .then((answers) => {
      const name = answers.name;
      const address = answers.address;
      const phone = answers.phone;
      const username = answers.username;
      const password = answers.password;
      const isEmploy = answers.isEmploy == "Yes" ? true : false;
      //   try{
      //     const user = newUser(name, address, phone, username, password, isEmploy);
      //     data.users.push(user)
      //   }
      mainView(data, save);
    });
}

function mainView(data, save) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Welcome to the Average Video Store",
        choices: ["Log in", "Register", "Exit"],
      },
    ])
    .then((answer) => {
      if (answer.choice == "Log in") {
        print("log in");
      } else if (answer.choice == "Register") {
        registerUser(data, save);
      } else {
        print("Exiting");
      }
    });
}

module.exports = { registerUser, mainView };
