// src/movie.js
const { nanoid } = require("nanoid");

/**
 * Create a Movie Object
 * @param {string} title - Movie Title
 * @param {string} director - Movie Director
 * @param {string} genre - Movie Genre
 * @param {number} year - Movie Release Year
 * @param {number} quantity - Quantity available on inventory
 * @param {number} price - Movie Price In Dollars
 * @returns {object} - Movie Object
 */
function newMovie(title, director, genre, year, quantity, price) {
  if (typeof title != "string" || title.length <= 0) {
    throw "Invalid Title";
  }
  if (typeof director != "string" || director.length <= 0) {
    throw "Invalid Director";
  }
  if (typeof genre != "string" || genre.length <= 0) {
    throw "Invalid Genre";
  }
  if (year < 0 || !Number.isInteger(year)) {
    throw "Invalid Year";
  }
  if (quantity < 0 || !Number.isInteger(quantity)) {
    throw "Invalid Quantity";
  }
  if (price < 0 || typeof price != "number") {
    throw "Invalid Price";
  }

  return {
    id: nanoid(10),
    title,
    director,
    genre,
    year,
    quantity,
    priceInCents: price * 100,
  };
}

module.exports = newMovie;
