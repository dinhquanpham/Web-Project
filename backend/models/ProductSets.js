const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Provider = require('./Providers');

const ProductSet = sequelize.define("productsets", {

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
    },

    newestChap: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

},
{
    tableName: "product_set"
});

Provider.hasMany(ProductSet);
ProductSet.belongsTo(Provider);

module.exports = ProductSet;
