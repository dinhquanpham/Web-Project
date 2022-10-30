const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const OrderDetails = sequelize.define("order_detail", {

    orderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

    productId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

    orderNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    price: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

    total: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
})

module.exports = OrderDetails;
