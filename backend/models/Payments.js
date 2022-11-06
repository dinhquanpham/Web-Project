const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Payments = sequelize.define("payments", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
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
});

module.exports = Payments;
