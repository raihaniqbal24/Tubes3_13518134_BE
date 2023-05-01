/* Global configuration file */

const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });
const suffix = {
  global: 'GLOBAL',
  development: 'DEV',
  testing: 'TEST',
  staging: 'STAG',
  production: 'PROD',
};
// TODO: validate config data

const ENV =
  process.env.NODE_ENV in suffix ? process.env.NODE_ENV : 'development';
const variables = Object.keys(process.env)
  .filter(
    (key) =>
      key.includes(`${suffix.global}_`) || key.includes(`${suffix[ENV]}_`),
  )
  .reduce((obj, key) => {
    let value = process.env[key];
    if (value === 'true' || value === 'false') {
      value = value === 'true';
    }
    return Object.assign(obj, {
      [key.split(/_(.*)/s)[1]]: value,
    });
  }, {});

module.exports = {
  // env: process.env.NODE_ENV || "development",
  // port: process.env.PORT || 3000,
  // googleAppCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  // keepServerAwake: process.env.KEEP_SERVER_AWAKE === "true",
  // apiUrl: process.env.API_URL || "http://localhost:5000",
  // enableLogFile: process.env.ENABLE_LOG_FILE === "true",
  // suffix: {
  //   development: "DEV",
  //   test: "TEST",
  //   production: "PROD"
  // }
  ENV,
  ...variables,
};
