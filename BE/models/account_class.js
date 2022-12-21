const Sequelize = require('sequelize');

const sequelize = require('../util/connect_mysql');

const Account_Class = sequelize.define('account_class', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  quantity: {
    type: Sequelize.INTEGER
  }
});

module.exports = Account_Class;