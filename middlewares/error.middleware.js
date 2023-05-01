const status = require('http-status');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger.config');

/**
 * Middleware specifically handling not found error.
 * @param {object} _req - HTTP request object
 * @param {object} _res - HTTP response object
 * @param {Function} next - Function to pass control to next middleware in sequence
 */
const notFoundHandler = (_req, _res, next) => {
  next(new ApiError(status.NOT_FOUND, status[status.NOT_FOUND]));
};

/**
 * Middleware to convert error (except ApiError) to internal
 * server error.
 * @param {Error} err - Error object
 * @param {object} _req - HTTP request object
 * @param {object} _res - HTTP response object
 * @param {Function} next - Function to pass control to next middleware in sequence
 */
const errorConverter = (err, _req, _res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = status.INTERNAL_SERVER_ERROR; // TODO: Adjust with unhandled client error
    const message = status[statusCode];
    error = new ApiError(statusCode, message, err.stack);
  }
  next(error);
};

/**
 * Middleware to return error response to user.
 * @param {ApiError} err - ApiError object
 * @param {object} _req - HTTP request object
 * @param {object} res - HTTP response object
 * @param {Function} _next - Function to pass control to next middleware in sequence
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  if (err.isServerError || config.ENV === 'development') {
    logger.error(err.stack);
  }

  res.status(err.statusCode).send(err.message);
};

module.exports = {
  notFoundHandler,
  errorConverter,
  errorHandler,
};
