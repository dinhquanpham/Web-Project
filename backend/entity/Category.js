const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Category = sequelize.define("category", {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
})

module.exports = Category;
