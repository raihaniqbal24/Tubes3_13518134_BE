const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dictionary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dictionary.init(
    {
      question: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: {
          arg: true,
          msg: 'Pertanyaan sudah ada dalam database.',
        },
        validate: {
          notEmpty: true,
        },
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Dictionary',
      tableName: 'dictionary',
      underscored: true,
      timestamps: true,
    },
  );
  return Dictionary;
};
