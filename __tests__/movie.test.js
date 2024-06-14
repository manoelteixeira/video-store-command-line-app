const newMovie = require("../src/movie");

describe("newMovie()", () => {
  // Test Data
  const title = "titanic";
  const director = "James Cameron";
  const genre = "Drama";
  const year = 1999;
  const quantity = 10;
  const price = 10.99;

  describe("title", () => {
    test("should thow an error when given an empty string", () => {
      expect(() =>
        newMovie("", director, genre, year, quantity, price)
      ).toThrow("Invalid Title");
    });
    test("should thow an error when given value is not an string", () => {
      expect(() =>
        newMovie(69, director, genre, year, quantity, price)
      ).toThrow("Invalid Title");
    });
  });

  describe("director", () => {
    test("should thow an error when given an empty string", () => {
      expect(() => newMovie(title, "", genre, year, quantity, price)).toThrow(
        "Invalid Director"
      );
    });
    test("should thow an error when given value is not an string", () => {
      expect(() => newMovie(title, true, genre, year, quantity, price)).toThrow(
        "Invalid Director"
      );
    });
  });

  describe("genre", () => {
    test("should thow an error when given an empty string", () => {
      expect(() =>
        newMovie(title, director, "", year, quantity, price)
      ).toThrow("Invalid Genre");
    });
    test("should thow an error when given value is not an string", () => {
      expect(() =>
        newMovie(title, director, 30.3, year, quantity, price)
      ).toThrow("Invalid Genre");
    });
  });

  describe("year", () => {
    test("should trow an error if given an negative value", () => {
      expect(() =>
        newMovie(title, director, genre, -2024, quantity, price)
      ).toThrow("Invalid Year");
    });
    test("should trow an error if given an value that is not an integer", () => {
      expect(() =>
        newMovie(title, director, genre, "-2024", quantity, price)
      ).toThrow("Invalid Year");
    });
  });

  describe("quantity", () => {
    test("should trow an error if given an negative value", () => {
      expect(() => newMovie(title, director, genre, year, -10, price)).toThrow(
        "Invalid Quantity"
      );
    });
    test("should trow an error if given an value that is not an integer", () => {
      expect(() =>
        newMovie(title, director, genre, year, "-10", price)
      ).toThrow("Invalid Quantity");
    });
  });

  describe("price", () => {
    test("should trow an error if given an negative value", () => {
      expect(() =>
        newMovie(title, director, genre, year, quantity, -10)
      ).toThrow("Invalid Price");
    });
    test("should trow an error if given an value that is not an number", () => {
      expect(() =>
        newMovie(title, director, genre, year, quantity, "-10")
      ).toThrow("Invalid Price");
    });
  });

  describe("output", () => {
    const actual = newMovie(title, director, genre, year, quantity, price);
    test("should return an object with id, title, director, genre, year, quantity and priceInCents keys", () => {
      expect(actual).toHaveProperty("title");
      expect(actual).toHaveProperty("director");
      expect(actual).toHaveProperty("genre");
      expect(actual).toHaveProperty("year");
      expect(actual).toHaveProperty("quantity");
      expect(actual).toHaveProperty("priceInCents");
      expect(actual).toHaveProperty("id");
      expect(actual.id.length).toBe(10);
      expect(Number.isInteger(actual.priceInCents)).toBe(true);
    });
  });
});
