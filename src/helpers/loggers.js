const colors = require("colors");

const logInfo = colors.yellow;
const logSucess = colors.green;
const logError = colors.red;
const logErrorMgs = colors.white.bgRed;
const print = console.log;

module.exports = { logInfo, logSucess, logError, logErrorMgs, print };
