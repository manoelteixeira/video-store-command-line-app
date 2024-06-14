const newUser = require("../src/user");

describe("newUser()", () => {
  const name = "Mike Nelson";
  const address = "173 No Street Some Where";
  const phone = "555-555-555";
  const username = "mNelson";
  const password = "psswd123";
  const isEmploy = false;

  describe("name", () => {
    test("should trhow an error when given an emplty string", () => {
      expect(() => {
        newUser("", address, phone, username, password, isEmploy);
      }).toThrow("Invalid Name");
    });
  });
  describe("address", () => {
    test("should trhow an error when given an emplty string", () => {
      expect(() => {
        newUser(name, "", phone, username, password, isEmploy);
      }).toThrow("Invalid Address");
    });
  });
  describe("phone", () => {
    test("should trhow an error when given an emplty string", () => {
      expect(() => {
        newUser(name, address, "", username, password, isEmploy);
      }).toThrow("Invalid Phone Number");
    });
  });
  describe("username", () => {
    test("should trhow an error when given an emplty string", () => {
      expect(() => {
        newUser(name, address, phone, "", password, isEmploy);
      }).toThrow("Invalid Username");
    });
  });
  describe("password", () => {
    test("should trhow an error when given an emplty string", () => {
      expect(() => {
        newUser(name, address, phone, username, "", isEmploy);
      }).toThrow("Invalid Password");
    });
  });
  describe("isEmploy", () => {
    test("should trhow an error when given anything other than a boolean value", () => {
      expect(() => {
        newUser(name, address, phone, username, password, "");
      }).toThrow("isEmploy should be a boolean value");
    });
  });
  describe("output", () => {
    const actual = newUser(name, address, phone, username, password, isEmploy);
    test("should return an object with id, name, address, phone, username, password and, isEmploy keys", () => {
      const actual = newUser(
        name,
        address,
        phone,
        username,
        password,
        isEmploy
      );
      expect(actual).toHaveProperty("id");
      expect(actual.id.length).toBe(10);
      expect(actual).toHaveProperty("name");
      expect(actual).toHaveProperty("address");
      expect(actual).toHaveProperty("phone");
      expect(actual).toHaveProperty("username");
      expect(actual).toHaveProperty("password");
      expect(actual).toHaveProperty("isEmploy");
    });
  });
});
