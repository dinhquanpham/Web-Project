const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const ProductSet = sequelize.define("productset", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
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
    
},
{
    tableName : "product_set"
});

module.exports = ProductSet;
