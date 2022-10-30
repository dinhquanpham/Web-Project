const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Payment = sequelize.define("payment", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    type:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    allowed:{
        type: Sequelize.STRING,
        allowNull: true,
    }
})

module.exports = Payment;
