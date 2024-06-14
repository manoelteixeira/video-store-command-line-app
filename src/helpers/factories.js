// src/helpers/factories.js
const { faker } = require("@faker-js/faker");
const newMovie = require("../movie");
const newUser = require("../user");

function movieFactory(quantity) {
  const output = [];
  for (let idx = 0; idx < quantity; idx++) {
    const title = `${faker.word.adjective()} ${faker.animal.type()}`;
    const director = faker.person.fullName();
    const genre = faker.word.verb();
    const year = faker.date.past({ years: 100 }).getFullYear();
    const quantity = Math.floor(Math.random() * 1000);
    const price = parseFloat((Math.random() * 100).toFixed(2));
    output.push(newMovie(title, director, genre, year, quantity, price));
  }
  return output;
}

function userFactory(quantity) {
  const output = [];
  for (let idx = 0; idx < quantity; idx++) {
    const name = faker.person.fullName();
    const address = `${faker.location.streetAddress()}, ${faker.location.city()}`;
    const phone = faker.phone.number();
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const isEmploy = faker.datatype.boolean();
    output.push(newUser(name, address, phone, username, password, isEmploy));
  }
  return output;
}

module.exports = { movieFactory, userFactory };
