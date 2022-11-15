const Sequelize = require('sequelize');

const sequelize = require('../util/connect_mysql');

// Create database with define model of Sequelize
const Info_Account = sequelize.define('info_account', {
  // field primary key and type is String
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  
  full_name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  gender: {
    type: Sequelize.INTEGER
  },

  dob: {
    type: Sequelize.STRING
  },

  mobile: {
    type: Sequelize.INTEGER
  },

  address: {
    type: Sequelize.STRING
  },
});

module.exports = Info_Account;