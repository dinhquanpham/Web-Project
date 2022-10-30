const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Author = sequelize.define("author", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    name:{
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Author;
