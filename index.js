var figlet = require("figlet");
const lolcatjs = require("lolcatjs");
const { parameterHandler, fileHandler } = require("./src/helpers/handlers");
const { choose } = require("./src/helpers/utils");
const { mainView } = require("./src/views");
const {
  createUser,
  readUser,
  readUsers,
  updateUser,
  deleteUser,
} = require("./src/user-crud");
const {
  createMovie,
  readMovie,
  readMovies,
  updateMovie,
  deleteMovie,
} = require("./src/movie-crud");
const {
  logInfo,
  logSucess,
  logError,
  print,
} = require("./src/helpers/loggers");

function welcome() {
  lolcatjs.options.seed = Math.round(Math.random() * 1000);
  lolcatjs.options.colors = true;
  const fonts = [
    "Larry 3D",
    "Lil Devil",
    "Ghost",
    "Merlin1",
    "Rounded",
    "Shadow",
    "5 Line Oblique",
    "Avatar",
    "Catwalk",
  ];
  const options = {
    font: choose(fonts),
    horizontalLayout: "default",
    verticalLayout: "default",
    width: process.stdout.columns,
    whitespaceBreak: true,
  };
  const draw = (err, data) => {
    if (err) {
      print(logErrorMsg("Something went wrong..."));
      print(logError(err));

      return;
    }
    lolcatjs.fromString(data);
  };
  figlet.text("Video Store", options, draw);
}

function main() {
  const { option, arguments } = parameterHandler();
  const { load, save } = fileHandler("./data", "app-data.json");
  const data = load();
  let updatedData = {};
  let canSave = false;

  switch (option) {
    case "--create-user":
      print(logInfo("Creating User..."));
      updatedData = createUser(data, arguments);
      canSave = true;
      break;
    case "--show-user":
      print(logInfo("Loading User..."));
      readUser(data, arguments);
      break;
    case "--show-users":
      print(logInfo("Loading Users..."));
      readUsers(data);
      break;
    case "--update-user":
      print(logInfo("Updating User..."));
      updatedData = updateUser(data, arguments);
      canSave = true;
      break;
    case "--delete-user":
      print(logInfo("Deleting User..."));
      updatedData = deleteUser(data, arguments);
      canSave = true;
      break;
    case "--create-movie":
      print(logInfo("Creating Movie..."));
      updatedData = createMovie(data, arguments);
      canSave = true;
      break;
    case "--show-movie":
      print(logInfo("Loading Movie..."));
      readMovie(data, arguments);
      break;
    case "--show-movies":
      print(logInfo("Loading Movies..."));
      readMovies(data);
      break;
    case "--update-movie":
      print(logInfo("Updating Movie..."));
      updatedData = updateMovie(data, arguments);
      canSave = true;
      break;
    case "--delete-movie":
      print(logInfo("Deleting Movie..."));
      updatedData = deleteMovie(data, arguments);
      canSave = true;
      break;

    case "--start":
      welcome();
      setTimeout(() => {
        mainView(load, save);
      }, 500);
      break;
    default:
      print("Invalid Option");
  }
  if (canSave) {
    save(updatedData);
  }
}

main();
