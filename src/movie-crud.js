// src/movie-crud.js
const newMovie = require("./movie");
const {
  getDataByID,
  getDataIndex,
  createDataTable,
  createMoviesTable,
} = require("./helpers/dataHelpers");
const { logInfo, logSucess, logError, print } = require("./helpers/loggers");
const { da } = require("@faker-js/faker");

const movieParams = ["title", "director", "genre", "year", "quantity", "price"];

/**
 * Create a new user
 * @param {Object} data - Application data
 * @param {Object} args
 * @returns
 */
function createMovie(data, args) {
  //   Validate Args
  const movieParamsStr = movieParams.sort().join(" ");
  const argsStr = Object.keys(args).sort().join(" ");
  if (movieParamsStr != argsStr) {
    throw logError(
      `Missing Parameters!\nParameters expected: ${logInfo(movieParamsStr)}`
    );
  }

  const title = args.title;
  const director = args.director;
  const genre = args.genre;
  const year = Number(args.year);
  const quantity = Number(args.quantity);
  const price = parseFloat(args.price);

  try {
    const movie = newMovie(title, director, genre, year, quantity, price);
    data.movies.push(movie);
    print(`${logSucess("Neu Movie Created.")}\n\n${createDataTable(movie)}`);
    return data;
  } catch (err) {
    print(logError(err));
  }
}

/**
 * Show specific movie data
 * @param {*} data
 * @param {*} args
 */
function readMovie(data, args) {
  const { id } = args;
  if (!id) {
    throw logError("Missing Movie ID");
  }

  const movie = getDataByID(data.movies, id);
  if (!movie) {
    throw logError("Movie Not Found");
  } else {
    print(createDataTable(movie));
  }
}

/**
 * Show all movies
 * @param {*} data
 */
function readMovies(data) {
  print(createMoviesTable(data.movies));
}

/**
 * Update move
 * @param {*} data
 * @param {*} args
 * @returns
 */
function updateMovie(data, args) {
  const { id } = args;
  if (!id) {
    throw logError("Missing Movie ID");
  }

  const movieIdx = getDataIndex(data.movies, id);
  if (movieIdx == -1) {
    throw logError("Movie Not Found");
  }

  const argKeys = Object.keys(args);

  for (const key of argKeys) {
    if (key != "id" && movieParams.includes(key)) {
      data.movies[movieIdx][key] = args[key];
    }
  }
  print(createDataTable(data.movies[movieIdx]));
  return data;
}

/**
 * Update move
 * @param {*} data
 * @param {*} args
 * @returns
 */
function deleteMovie(data, args) {
  const { id } = args;
  if (!id) {
    throw logError("Missing Movie ID");
  }
  const movie = getDataByID(data.movies, id);
  if (!movie) {
    throw logError("Movie Not Found");
  }
  const movieIdx = getDataIndex(data.movies, id);
  data.movies.splice(movieIdx, 1);
  print(createDataTable(movie));
  return data;
}

module.exports = {
  createMovie,
  readMovie,
  readMovies,
  updateMovie,
  deleteMovie,
};
