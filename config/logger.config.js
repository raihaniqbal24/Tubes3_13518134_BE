const path = require('path');
const winston = require('winston');
const config = require('./config');

const colorizer = winston.format.colorize();
const consoleLogFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.printf((info) =>
    colorizer.colorize(
      info.level,
      `[${info.timestamp}] ${info.level.toUpperCase()} - ${info.message}`,
    ),
  ),
);
const fileLogFormat = winston.format.combine(
  winston.format.uncolorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) =>
      `[${info.timestamp}] ${info.level.toUpperCase()} - ${info.message}`,
  ),
);

const logger = winston.createLogger({
  transports: [],
});

// TODO: adjust settings for staging and production
logger.add(
  new winston.transports.File({
    level: 'info',
    filename: path.join(__dirname, '../logs/app.info.log'),
    handleExceptions: true,
    maxsize: 5242880,
    maxFiles: 5,
    format: fileLogFormat,
    silent: config.ENV !== 'development',
  }),
);
// TODO: adjust settings for staging and production
logger.add(
  new winston.transports.File({
    level: 'error',
    filename: path.join(__dirname, '../logs/app.error.log'),
    handleExceptions: true,
    maxsize: 5242880,
    maxFiles: 5,
    format: fileLogFormat,
    silent: config.ENV !== 'development',
  }),
);
logger.add(
  new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    format: consoleLogFormat,
    silent: config.ENV !== 'development',
  }),
);

logger.stream = {
  write: (message) => logger.info(message),
};

module.exports = logger;
