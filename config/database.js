const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('module_b', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = { sequelize };
