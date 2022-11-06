const Sequelize = require("sequelize");
const sequelize = require('../database/connect');
const Authors = require('./Authors');
const ProductSet = require('./ProductSet');
const Providers = require('./Providers');

const Products = sequelize.define("products", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    productName:{
        type: Sequelize.STRING,
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

    publishedYear:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    
    productSize:{
        type: Sequelize.STRING,
        allowNull: false,
    },

});

Authors.hasMany(Products);
Products.belongsTo(Authors);

ProductSet.hasOne(Products);
Products.belongsTo(ProductSet);

Providers.hasOne(Products);
Products.belongsTo(Providers);

module.exports = Products;
