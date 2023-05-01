const status = require('http-status');

/**
 * An error class specifically handling HTTP error
 * @property {integer} statusCode - HTTP error code
 * @property {string} message - Error message
 * @property {boolean} isServerError - Mark whether it's an internal error or not
 * @property {string} stack - Error stack
 */
class ApiError extends Error {
  constructor(statusCode, message, stack = null) {
    super(message);
    this.statusCode = statusCode;
    this.isServerError = status[`${statusCode}_CLASS`] === status.classes.SERVER_ERROR;
    if (stack) {
      this.stack = stack;
    }
  }
}

module.exports = ApiError;
