const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Categories = sequelize.define("categories", {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Categories;
