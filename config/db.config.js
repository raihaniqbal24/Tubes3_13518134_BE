const path = require('path');
const config = require('./config');

const dbConfig = {};

const dialect = config.DB_DIALECT;
// TODO: validate username, host, and db name (use joi?)
const username = config.DB_USERNAME;
const password = config.DB_PASSWORD;
const host = config.DB_HOST;
const port = config.DB_PORT;
const db = config.DB_DATABASE;
const url = [
  `${dialect}://`,
  username,
  password ? `:${password}` : '',
  `@${host}`,
  port ? `:${port}` : '',
  `/${db}`,
].join('');
dbConfig.url = url;
dbConfig.logging = false;
dbConfig.dialect = dialect;
dbConfig.migrationStorageTableName = 'sequelize_meta';
if (config.ENV === 'staging' || config.ENV === 'production') {
  dbConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

module.exports = dbConfig;
