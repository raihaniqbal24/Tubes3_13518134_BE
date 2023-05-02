/**
 * A Wrapper of Express request handler. It returns result if no
 * error detected, else it pass error to next function
 * @param {Function<Promise>} func - Function with req, res, and next parameter
 * @returns {Function}             - A wrapped function with req, res, and next parameter
 */
const asyncWrapper = (func) => async (req, res, next) => {
  try {
    const result = await func(req, res, next);
    return result;
  } catch (err) {
    return next(err);
  }
};

module.exports = asyncWrapper;
