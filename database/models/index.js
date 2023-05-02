const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const basename = path.basename(__filename);
// eslint-disable-next-line import/no-dynamic-require
const dbConfig = require(`${__dirname}/../../config/db.config.js`);
const db = {};

const sequelize = new Sequelize(dbConfig.url, dbConfig);

fs.readdirSync(__dirname)
  // Filter not hidden file, not this file, and javascript file
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
