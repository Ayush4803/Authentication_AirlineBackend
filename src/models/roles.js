'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      // Many-to-Many relation: A Role can belong to many Users
      this.belongsToMany(models.User, {
        through: 'User_Roles'
      });
    }
  }

  Roles.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Roles',
    }
  );

  return Roles;
};
