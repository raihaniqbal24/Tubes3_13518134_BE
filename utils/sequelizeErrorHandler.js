const status = require('http-status');
const ApiError = require('./ApiError');

/**
 * Error thrower for sequelize unique constraint/validation and foreign key
 * error, because those are still considered user generated error (not internal).
 * @param {Error} err               - Error object (or its subclasses)
 * @param {object} customMessages   - Custom error message for each error (if exist)
 * @param {string} customMessages.uniqueErrorMessage  - custom unique error message, else default is used
 * @param {string} customMessages.fkErrorMessage      - custom foreign key error message, else default is used
 */
const sequelizeErrorHandler = (err, customMessages = {}) => {
  if (
    err.name === 'SequelizeUniqueConstraintError' ||
    err.name === 'SequelizeValidationError'
  ) {
    let message = customMessages.uniqueErrorMessage;
    if (!message && err.errors.length > 0 && !!err.errors[0].message) {
      message = err.errors[0].message;
      if (err.errors[0].path === 'PRIMARY') {
        message = 'Data sudah ada, silakan coba data lain atau hubungi admin.';
      }
    } else if (!message) {
      message = err.message;
    }
    throw new ApiError(status.UNPROCESSABLE_ENTITY, message);
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    throw new ApiError(
      status.CONFLICT,
      customMessages.fkErrorMessage || 'Terjadi kesalahan',
      err.stack,
    );
  } else {
    throw err;
  }
};

module.exports = {
  sequelizeErrorHandler,
};
