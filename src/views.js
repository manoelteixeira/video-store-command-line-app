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
  createCartTable,
  getDataByID,
} = require("./helpers/dataHelpers");

const newUser = require("./user");
const newMovie = require("./movie");
const { vi } = require("@faker-js/faker");

function registerUserView(data, load, save, view) {
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
        view();
      }
    });
}

function registerMovieView(data, load, save, view) {
  const title = {
    name: "title",
    message: "Title",
  };
  const director = {
    name: "director",
    message: "Director",
  };
  const genre = {
    name: "genre",
    message: "Genre",
  };
  const year = {
    name: "year",
    message: "Year",
    validate(answer) {
      const value = parseInt(answer);
      if (!isNaN(value) && value > 0) {
        return true;
      } else if (value <= 0) {
        return "Year must be a positive Number";
      } else {
        return "Year must be a number";
      }
    },
  };
  const quantity = {
    name: "quantity",
    message: "Quantity",
    validate(answer) {
      const value = parseInt(answer);
      if (!isNaN(value) && value > 0) {
        return true;
      } else if (value <= 0) {
        return "Quantity must be a positive Number";
      } else {
        return "Quantity must be a number";
      }
    },
  };
  const price = {
    name: "price",
    message: "Price",
    validate(answer) {
      if (answer.includes(",")) {
        return 'Use "." instead of ","';
      } else {
        const value = parseFloat(answer);
        if (!isNaN(value) && value > 0) {
          return true;
        } else if (value <= 0) {
          return "Price must be a positive Number";
        } else {
          return "Price must be a number";
        }
      }
    },
  };
  inquirer
    .prompt([title, director, genre, year, quantity, price])
    .then((answers) => {
      let { title, director, genre, year, quantity, price } = answers;
      year = parseInt(year);
      quantity = parseInt(quantity);
      price = parseFloat(price);
      try {
        const movie = newMovie(title, director, genre, year, quantity, price);
        data.movies.push(movie);
        save(data);
      } catch (err) {
        print(logError(err));
      } finally {
        view();
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

function usersListView(data, view) {
  print(createUsersTable(data.users));
  setTimeout(() => {
    view();
  }, 500);
}

function moviesListView(data, view) {
  print(createMoviesTable(data.movies));
  setTimeout(() => {
    view();
  }, 500);
}

function cartItemsView(data, view) {}

function addToCartView(data, user, save, view) {
  const userIdx = getDataIndex(data.users, user.id);
  const movies = data.movies
    .filter((movie) => movie.quantity > 0)
    .map((movie) => {
      return {
        name: `${logError(movie.year)} ${logSucess(movie.title)} ${logInfo(
          "by"
        )} ${movie.director}`,
        value: movie.id,
      };
    });
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "movies",
        message: "Select movies all the movies you want.",
        choices: [...movies],
      },
    ])
    .then((answer) => {
      try {
        const cart = answer.movies.map((id) => getDataByID(data.movies, id));
        if (user.cart) {
          data.users[userIdx].cart.push(...cart);
        } else {
          data.users[userIdx].cart = cart;
        }
        save(data);
      } catch (err) {
        print(logError(err));
      } finally {
        view();
      }
    });
}

function userView(user, load, save) {
  const data = load();
  const currentView = () => userView(user, load, save);
  // const userIdx = getDataIndex(data.users, user.id);
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: logSucess("Costumer menu:"),
        choices: ["See cart", "Add movie to cart", "Check out", "Exit"],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "See cart":
          break;
        case "Add movie to cart":
          addToCartView(data, user, save, currentView);
          break;
        case "Check out":
          break;
        default:
          print(logError("Going Back to Main Menu..."));
          mainView(load, save);
      }
    });
}

function employeeView(user, load, save) {
  const data = load();
  const currentView = () => employeeView(user, load, save);
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: logSucess("Employee Menu:"),
        choices: [
          "View Users List",
          "Add User",
          "Update user information",
          "View Movies List",
          "Add Movie",
          "Update movie information",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "View Users List":
          print(logSucess("Loading users list..."));
          usersListView(data, currentView);
          break;
        case "Add User":
          print(logSucess("Add new user:"));
          registerUserView(data, load, save, currentView);
          break;
        case "Update user information":
          print(logSucess("Update update user information:"));
          updateUser(data, load, save, currentView);
          break;
        case "View Movies List":
          moviesListView(data, currentView);
          break;
        case "Add Movie":
          print(logSucess("Add new movie:"));
          registerMovieView(data, load, save, currentView);
          break;
        case "Update movie information":
          print(logSucess("Update movie information:"));
          updateMovie(data, load, save, currentView);
          break;

        default:
          print(logError("Going Back to Main Menu..."));
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
          employeeView(user, load, save);
        }, 50);
      } else {
        setTimeout(() => {
          userView(user, load, save);
        }, 50);
      }
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
        registerUserView(data, load, save, () => mainView(load, save));
      } else {
        print("Exiting..");
      }
    });
}

// module.exports = { registerUserView, mainView };
module.exports = { mainView };
