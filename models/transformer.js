'use strict';

module.exports = (sequelize, DataTypes) => {
  const transformer = sequelize.define('transformer', {
    name: DataTypes.STRING,
    faction: DataTypes.STRING,
    power: DataTypes.INTEGER
  }, {});
  transformer.associate = function (models) {
    // associations can be defined here
  };
  return transformer;
};
