const Sequelize = require('sequelize');

const sequelize = require('../util/connect_mysql');

// Create database with define model of Sequelize
const Task = sequelize.define('task', {
  // field primary key and type is String
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  status: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Task;