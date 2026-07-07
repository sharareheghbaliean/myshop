const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myshopdb', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
