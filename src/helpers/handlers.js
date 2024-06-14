// src/helpers/handlers.js
const { writeFileSync, readFileSync, existsSync } = require("node:fs");
const { logInfo, logSucess, logError, print } = require("./loggers");

function parameterHandler() {
  const params = process.argv.slice(2);
  if (params.length == 0) {
    return "none";
  } else if (params[0].indexOf("--") != 0) {
    throw "invalid option flag";
  }

  const output = {
    option: params.shift(),
    arguments: {},
  };

  for (const param of params) {
    if (!param.includes("=")) {
      throw "Invalid arguments";
    }
    const [key, value] = param.split("=");
    output.arguments[key] = value;
  }
  return output;
}

function fileHandler(path, fileName, logging = false) {
  // Data validation
  if (!fileName || fileName.length == 0) {
    throw "Invalid file name";
  }
  if (!path || !existsSync(path)) {
    throw "Invalid path";
  }
  const file = `${path}/${fileName}`;
  if (!existsSync(file)) {
    if (logging) {
      print(
        `${logError("File Not Found.")}\n${logInfo("Creating data file.")}`
      );
    }
    writeFileSync(file, "");
  }
  if (logging) {
    print(logSucess("File Found."));
  }

  const save = (data) => {
    data = JSON.stringify(data, 0, 2);
    writeFileSync(file, data, { encoding: "utf-8" });
  };

  const load = () => {
    const data = readFileSync(file, "utf8");
    return data ? JSON.parse(data) : { movies: [], users: [] }; // Change this
  };

  return { save, load };
}

module.exports = { parameterHandler, fileHandler };
