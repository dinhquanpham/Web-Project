const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Product = sequelize.define("product", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    productName:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    authorId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    authorId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    setId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    price:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    quantityInStock:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    description:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    providerId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    
    publishedYear:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    
    productSize:{
        type: Sequelize.STRING,
        allowNull: false,
    },

})

module.exports = Product;
