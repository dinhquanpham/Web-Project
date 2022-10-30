const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const ProductSet = sequelize.define("product_set", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    name:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    description:{
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = ProductSet;
