const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Order = sequelize.define("order", {

    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

    orderDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    shippedDate: {
        type: Sequelize.DATE,
        allowNull: true,
    },

    paidAmount: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

    paidStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },

    paidAt: {
        type: Sequelize.DATE,
        allowNull: true,
    },

})

module.exports = Order;
