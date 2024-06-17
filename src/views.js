const inquirer = require("inquirer");
const {
  logInfo,
  logSucess,
  logError,
  logErrorMsg,
  print,
} = require("./helpers/loggers");

const {
  getDataIndex,
  createUsersTable,
  createMoviesTable,
} = require("./helpers/dataHelpers");
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
      print(`Welcome ${logInfo(user.name)}.`);
      if (user.isEmploy) {
        setTimeout(() => {
          employeeView(data, user, load, save);
        }, 50);
      } else {
        setTimeout(() => {
          userView(data, user, load, save);
        }, 50);
      }
    }
  });
}

async function updateUser(data, load, save, view) {
  const users = data.users.map((user) => `${user.id} - ${user.username}`);
  const keys = ["Name", "Address", "Phone", "Password"];
  const userList = {
    type: "list",
    name: "user",
    message: `Users List:`,
    choices: [...users],
  };
  const keyList = {
    type: "list",
    name: "key",
    choices: [...keys],
  };
  const newValue = {
    name: "value",
    message: "New value",
  };

  await inquirer.prompt([userList, keyList, newValue]).then((answer) => {
    const { user, key, value } = answer;
    const userID = user.split(" - ")[0];
    const userIdx = getDataIndex(data.users, userID);
    data.users[userIdx][key.toLowerCase()] = value;
    save(data);
    print(createUsersTable(data.users));
    view();
  });
}

async function updateMovie(data, load, save, view) {
  const movies = data.movies.map((movie) => `${movie.id} - ${movie.title}`);
  const keys = ["Title", "Director", "Genre", "Year", "Quantity", "Price"];
  const movieList = {
    type: "list",
    name: "movie",
    message: `Movie List:`,
    choices: [...movies],
  };
  const keyList = {
    type: "list",
    name: "key",
    choices: [...keys],
  };
  const newValue = {
    name: "value",
    message: "New value",
  };

  await inquirer.prompt([movieList, keyList, newValue]).then((answer) => {
    let { movie, key, value } = answer;
    const movieID = movie.split(" - ")[0];
    const movieIdx = getDataIndex(data.movies, movieID);
    key = key == "Price" ? "priceInCents" : key.toLowerCase();
    data.movies[movieIdx][key] = Number(value) * 100;
    save(data);
    print(createMoviesTable(data.movies));
    view();
  });
}

function userView(data, user, load, save) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: logSucess("Costumer menu:"),
        choices: ["Add movie to cart", "See cart", "Exit"],
      },
    ])
    .then((answer) => {
      const { choice } = answer.choice;
      if (choice == "Exit") {
        mainView(load, save);
      }
    });
}

function employeeView(data, user, load, save) {
  const currentView = () => employeeView(data, user, load, save);
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: logSucess("Employee Menu:"),
        choices: [
          "Update movie information",
          "Update user information",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      if (answer.choice == "Update movie information") {
        print(logSucess("Update movie information:"));
        updateMovie(data, load, save, currentView);
      } else if (answer.choice == "Update user information") {
        print(logSucess("Update update user information:"));
        updateUser(data, load, save, currentView);
      } else if (answer.choice == "Exit") {
        print(logError("Going Back to Main Menu..."));
        mainView(load, save);
      }
    });
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
