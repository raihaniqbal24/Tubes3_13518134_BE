const Joi = require('joi');
const status = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Middleware to validate user input with a validator.
 * It throws BAD REQUEST error for invalid input, otherwise
 * it continue execution to the next handler.
 * @param {object} validator - A validator schema
 * @returns {Function} - Express request handler function
 */
const validate = (validator) => (req, _res, next) => {
  const object = Object.keys(validator).reduce((prev, current) => {
    if (req[current]) {
      // eslint-disable-next-line no-param-reassign
      prev[current] = req[current];
    }
    return prev;
  }, {});
  const schema = Joi.compile(validator);
  const { error } = schema.validate(object, {
    abortEarly: false,
    errors: {
      label: 'key',
    },
  });
  if (error) {
    const message = error.details.map((value) => value.message).join(', ');
    next(new ApiError(status.BAD_REQUEST, message));
  } else {
    next();
  }
};

module.exports = validate;
