const Sequelize = require('sequelize');

const sequelize = require('../util/connect_mysql');

// Create database with define model of Sequelize
const Account = sequelize.define('account', {
  // field primary key and type is String
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  },

  status: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  token: {
    type: Sequelize.STRING
  }
});

module.exports = Account;