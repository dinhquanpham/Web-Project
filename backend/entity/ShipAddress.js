const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const ShipAddress = sequelize.define("ship_address", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,   
        primaryKey: true,
    },

    province:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    streetddress:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    houseAddress:{
        type: Sequelize.STRING,
        allowNull: false,
    },

})

module.exports = ShipAddress;

