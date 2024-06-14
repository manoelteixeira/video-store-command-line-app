const inquirer = require("inquirer");
const {
  logInfo,
  logSucess,
  logError,
  logErrorMsg,
  print,
} = require("./helpers/loggers");

const newUser = require("./user");

function registerUserView(data, load, save) {
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
      try {
        const user = newUser(
          name,
          address,
          phone,
          username,
          password,
          isEmploy
        );
        data.users.push(user);
        save(data);
      } catch (err) {
        print(logError(err));
      } finally {
        mainView(load, save);
      }
    });
}

function loginView(data, load, save) {
  const username = {
    name: "username",
    message: "Username",
  };
  const password = {
    type: "password",
    name: "password",
    message: "Password",
  };
  inquirer.prompt([username, password]).then((answers) => {
    const { username, password } = answers;
    const user = data.users.find((user) => user.username == username);
    if (!user) {
      print(logError("User not found."));
      mainView(load, save);
    } else if (user.password != password) {
      print(logError("Wrong Password"));
      mainView(load, save);
    } else {
      if (user.isEmploy) {
        employView();
      } else {
        userView();
      }
    }
  });
}

function userView(data) {
  print("User Logged");
}

function employView() {
  print("Employ Logged");
}

function mainView(load, save) {
  const data = load();
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
        loginView(data, load, save);
      } else if (answer.choice == "Register") {
        registerUserView(data, load, save);
      } else {
        print("Exiting..");
      }
    });
}

// module.exports = { registerUserView, mainView };
module.exports = { mainView };
