const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Provider = sequelize.define("provider", {

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

module.exports = Provider;
