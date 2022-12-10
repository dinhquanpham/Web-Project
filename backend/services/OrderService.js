const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Order = require('../models/Orders');

let format = function(a) {
    let b = 'FAHASA_' + a;
    return b;
}

let localDate = function() {
    let data = Date.now() + 25200000;
    return new Date(data)
}

let shipDate = function() {
    let data = Date.now() + 259200000;
    return new Date(data);
}

let getOrderById = async (orderId) => {
    try {
        let result = await Order.findOne({
            where: {
                id: orderId
            }
        });
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getAllOrder = async () => {
    try {
        let result = await sequelize.query(
            'select o.*, u.id, u.username from orders o join users u on u.id = o.userId;',
            {
                raw: true,
                type: QueryTypes.SELECT
            }
        );
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getOrderByUser = async (userId) => {
    try {
        let result = await sequelize.query(
            'select * from orders where userId = ?', {
            raw: true,
            replacements: [userId],
            type: QueryTypes.SELECT
        }
        )
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let addOrder = async (data) => {
    try {
        orderDate = localDate();
        shippedDate = shipDate();
        let result = await Order.create({
            id: data.id,
            orderDate: orderDate,
            shippedDate: shippedDate,
            paidAmount: data.paidAmount,
            userId: data.userId,
            paymentId: data.paymentId
        })
        const orderCode = format(result.id);
        result.set({
            orderCode: orderCode
        });
        result.save();
        return result;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let updateOrderStatus = async (orderId) => {
    try {
        let order = await Order.findOne({
            where: {
                id: orderId
            }
        });
        order.set({
            paidAt: localDate(),
            paidStatus: 1
        })
        order.save();
        return order;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let deleteOrder = async (orderId) => {
    try {
        let order = await Order.findOne({
            where: {
                id: orderId,
            }
        });
        await order.destroy();
        return data = {
            message: "Deleted",
        }
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

module.exports = {
    getOrderById: getOrderById,
    getAllOrder: getAllOrder,
    getOrderByUser: getOrderByUser,
    addOrder: addOrder,
    updateOrderStatus: updateOrderStatus,
    deleteOrder: deleteOrder,
}