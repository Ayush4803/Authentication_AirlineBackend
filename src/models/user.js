'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
require('dotenv').config();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Many-to-Many relation: A User can have many Roles
      this.belongsToMany(models.Roles, {
        through: 'User_Roles'
      });
    }

    // Compare plain password with hashed password
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [6, 50] },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync(SALT_ROUNDS);
          user.password = bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate: (user) => {
          if (user.changed('password')) {
            const salt = bcrypt.genSaltSync(SALT_ROUNDS);
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );

  return User;
};
