require('dotenv/config');

const Sequelize = require("sequelize");

const sequelize = new Sequelize("db", "root", "Sang1234.",{
    dialect: "mysql",
    host: 3306
});

module.exports = sequelize;